import { Injectable, Inject } from '@nestjs/common';
import type { ICertificateRepository } from '../../domain/repositories/certificate.repository';

@Injectable()
export class GeneratePdfUseCase {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certRepo: ICertificateRepository,
  ) {}

  async execute(id: number, tipo: 'TACFI' | 'TCLO') {
    // 1. Buscar los datos completos del certificado (incluyendo el nombre de la ESFM)
    // Usamos el repositorio para traer el registro ya sea de la temporal o histórico
    const certData = await this.certRepo.getCertificateWithDetails(id, tipo);

    if (!certData) {
      throw new Error('Certificado no encontrado.');
    }

    // 2. Aquí retornamos el objeto listo para que el Service de Infraestructura (PDFKit)
    // lo convierta en un stream de bytes.
    return certData;
  }
}
