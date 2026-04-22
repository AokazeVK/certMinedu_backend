import { Injectable } from '@nestjs/common';
import { Prisma } from '@cest/client';
import { CestService } from 'src/core/infrastructure/prisma/cest.service'; // Tu servicio de la DB CEST
import { ICertificateRepository } from '../../domain/repositories/certificate.repository';
import { CertificateEntity } from '../../domain/entities/certificate.entity';

@Injectable()
export class PrismaCertificateRepository implements ICertificateRepository {
  private client: CestService | Prisma.TransactionClient;

  constructor(private readonly cestService: CestService) {
    this.client = cestService;
  }

  // Método auxiliar para cambiar el contexto a la transacción
  private withTransaction(
    tx: Prisma.TransactionClient,
  ): PrismaCertificateRepository {
    const repo = new PrismaCertificateRepository(this.cestService);
    repo.client = tx;
    return repo;
  }

  async runInTransaction<T>(
    work: (repo: ICertificateRepository) => Promise<T>,
  ): Promise<T> {
    return await this.cestService.$transaction(async (tx) => {
      const txRepo = this.withTransaction(tx);
      return await work(txRepo);
    });
  }

  async clearTempTable(): Promise<void> {
    await this.client.$executeRaw`TRUNCATE TABLE certificacion`;
  }

  async saveTemp(certificates: CertificateEntity[]): Promise<void> {
    await (this.client as any).certificacion.createMany({
      data: certificates.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        paterno: c.paterno,
        materno: c.materno,
        cedula: c.cedula,
        codigo_estudiante: c.codigoEstudiante,
        gestion: c.gestion,
        codigo_esfm: c.codigoEsfm,
        hoja_ruta: c.hojaRuta,
        taller: c.taller,
        tacfi: c.tacfi,
        nivel: c.nivel,
        lengua_originaria: c.lenguaOriginaria,
        carga_horaria: c.cargaHoraria,
        especialidad: c.especialidad,
      })),
    });
  }

  async getLastId(tipo: 'TACFI' | 'TCLO'): Promise<number> {
    const table = tipo === 'TACFI' ? 'certificacionTACFI' : 'certificacionTCLO';
    const result = await this.client.$queryRawUnsafe<any[]>(
      `SELECT MAX(id) as max FROM "${table}"`,
    );
    return Number(result[0]?.max || 0);
  }

  async countPendingInTemp(): Promise<number> {
    return await (this.client as any).certificacion.count({
      where: { valida_datos: 1 },
    });
  }

  async runValidationProcedure(
    codigoEsfm: number,
    tipoCer: number,
  ): Promise<void> {
    await this.client
      .$executeRaw`SELECT f_verifica_certificado(${codigoEsfm}, ${tipoCer})`;
  }

  async migrateToHistory(tipo: 'TACFI' | 'TCLO'): Promise<void> {
    if (tipo === 'TACFI') {
      await this.client.$executeRaw`
        INSERT INTO "certificacionTACFI" (id, nombre, paterno, materno, cedula, taller, codigo_esfm, carga_horaria, gestion, codigo_estudiante, tacfi, especialidad, hoja_ruta)
        SELECT id, nombre, paterno, materno, cedula, taller, codigo_esfm, carga_horaria, gestion, codigo_estudiante, tacfi, especialidad, hoja_ruta
        FROM certificacion
        WHERE (dato_corregido <> 99 OR dato_corregido IS NULL) AND valida_datos = 1
      `;
    } else {
      await this.client.$executeRaw`
        INSERT INTO "certificacionTCLO" (id, nombre, paterno, materno, cedula, taller, codigo_esfm, esfm, departamento, lengua_originaria, nivel, carga_horaria, gestion, codigo_estudiante, hoja_ruta)
        SELECT id, nombre, paterno, materno, cedula, taller, codigo_esfm, esfm, departamento, lengua_originaria, nivel, carga_horaria, gestion, codigo_estudiante, hoja_ruta
        FROM certificacion
        WHERE (dato_corregido <> 99 OR dato_corregido IS NULL) AND valida_datos = 1
      `;
    }
  }

  async getTempByEsfm(
    tipo: 'TACFI' | 'TCLO',
    codigo_esfm: number,
  ): Promise<any[]> {
    if (tipo === 'TACFI') {
      return await this.client.certificacionTACFI.findMany({
        where: { codigo_esfm: codigo_esfm },
        orderBy: { paterno: 'asc' }, // O el orden que prefieras
      });
    } else {
      return await this.client.certificacionTCLO.findMany({
        where: { codigo_esfm: codigo_esfm },
        orderBy: { paterno: 'asc' },
      });
    }
  }
  async getCertificateWithDetails(
    id: number,
    tipo: 'TACFI' | 'TCLO',
  ): Promise<any> {
    const table = tipo === 'TACFI' ? 'certificacionTACFI' : 'certificacionTCLO';
    const results = await this.client.$queryRawUnsafe<any[]>(
      `SELECT c.*, e.name as nombre_esfm_full 
       FROM "${table}" c 
       LEFT JOIN esfms e ON c.codigo_esfm = e.cod_esfm 
       WHERE c.id = $1`,
      id,
    );
    return results[0];
  }

  async findInHistoryByStudentCode(
    codigo: string,
    tipo: 'TACFI' | 'TCLO',
  ): Promise<any[]> {
    const table = tipo === 'TACFI' ? 'certificacionTACFI' : 'certificacionTCLO';
    return await this.client.$queryRawUnsafe<any[]>(
      `SELECT * FROM "${table}" WHERE codigo_estudiante = $1`,
      codigo,
    );
  }
}
