import { Injectable, Inject } from '@nestjs/common';
import type { ICertificateRepository } from '../../domain/repositories/certificate.repository';
import type { IPersonRepository } from '../../domain/repositories/person.repository';
import { ImportCertificateDto } from '../dtos/import-certificate.dto';
import { CertificateEntity } from '../../domain/entities/certificate.entity';

@Injectable()
export class ProcessImportUseCase {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certRepo: ICertificateRepository,

    @Inject('IPersonRepository')
    private readonly personRepo: IPersonRepository,
  ) {}

  async execute(dto: ImportCertificateDto) {
    // La transacción se maneja desde el repositorio para no romper Clean Architecture
    return await this.certRepo.runInTransaction(async (txRepo) => {
      // 1. VALIDACIÓN DE SEGURIDAD
      const pendingCount = await txRepo.countPendingInTemp();
      if (pendingCount > 0) {
        throw new Error(
          'Existen certificados pendientes de emisión. Procéselos o limpie la tabla antes de continuar.',
        );
      }

      // 2. LIMPIEZA
      await txRepo.clearTempTable();

      // 3. OBTENER CORRELATIVO
      let lastId = await txRepo.getLastId(dto.tipo);

      // 4. MAPEO
      const certificatesToSave = dto.excelData.map((row) => {
        lastId++;
        return new CertificateEntity(
          lastId,
          String(row['NOMBRE'] || ''),
          row['PATERNO'] ? String(row['PATERNO']) : null,
          row['MATERNO'] ? String(row['MATERNO']) : null,
          String(row['CI\n(sin extensión)'] || row['CI (sin extensión)'] || ''),
          String(row['COD_ESTUDIANTE'] || ''),
          Number(row['GESTIÓN\nCURSADA'] || row['GESTIÓN CURSADA'] || 0),
          dto.tipo,
          dto.hoja_ruta,
          dto.codigo_esfm,
          String(row['TALLER'] || row['DENOMINATIVO\nDEL TALLER'] || ''),
          row['TACFI'] ? String(row['TACFI']) : null,
          row['NIVEL'] ? String(row['NIVEL']) : null,
          row['LENGUA\nORIGINARIA'] ? String(row['LENGUA\nORIGINARIA']) : null,
          Number(row['CARGA \nHORARIA '] || row['CARGA HORARIA'] || 0),
        );
      });

      // 5. PERSISTENCIA TEMPORAL
      await txRepo.saveTemp(certificatesToSave);

      // 6. SINCRONIZACIÓN SIFM
      for (const cert of certificatesToSave) {
        const sifmData = await this.personRepo.findInSifmByCode(
          cert.codigoEstudiante,
        );
        if (sifmData) {
          await this.personRepo.upsertLocalPerson(sifmData);
        }
      }

      // 7. VALIDACIÓN POR DB (Procedimiento)
      const tipoCer = dto.tipo === 'TACFI' ? 1 : 2;
      await txRepo.runValidationProcedure(dto.codigo_esfm, tipoCer);

      // 8. RESULTADO
      return await txRepo.getTempByEsfm(dto.tipo, dto.codigo_esfm);
    });
  }
}
