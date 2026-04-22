import { Injectable, Inject } from '@nestjs/common';
import type { ICertificateRepository } from '../../domain/repositories/certificate.repository';

@Injectable()
export class SearchHistoryUseCase {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certRepo: ICertificateRepository,
  ) {}

  async execute(codigoEstudiante: string, tipo: 'TACFI' | 'TCLO') {
    return await this.certRepo.findInHistoryByStudentCode(
      codigoEstudiante,
      tipo,
    );
  }
}
