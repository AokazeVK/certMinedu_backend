import { Injectable, Inject } from '@nestjs/common';
import type { ICertificateRepository } from '../../domain/repositories/certificate.repository';
import { EmitCertificateDto } from '../dtos/emit-certificate.dto';

@Injectable()
export class EmitCertificateUseCase {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certRepo: ICertificateRepository,
  ) {}

  async execute(dto: EmitCertificateDto) {
    // 1. Verificamos que existan datos válidos para emitir en la temporal
    const results = await this.certRepo.getTempByEsfm(
      dto.tipo,
      dto.codigo_esfm,
    );
    const validCerts = results.filter((c) => c.validaDatos === 1);

    if (validCerts.length === 0) {
      throw new Error(
        'No hay certificados marcados como válidos para emitir en esta ESFM.',
      );
    }

    // 2. Ejecutar la migración al histórico (Paso 6 SQL)
    await this.certRepo.migrateToHistory(dto.tipo);

    // 3. Opcional: Podríamos limpiar la tabla temporal automáticamente después de emitir
    // await this.certRepo.clearTempTable();

    return {
      message: `${validCerts.length} certificados emitidos correctamente al histórico de ${dto.tipo}.`,
      count: validCerts.length,
    };
  }
}
