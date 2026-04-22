import { Module } from '@nestjs/common';
import { CertificateController } from './infrastructure/controllers/certificate.controller';
import { CestService } from 'src/core/infrastructure/prisma/cest.service';
import { SifmService } from 'src/core/infrastructure/prisma/sifm.service';
import { ProcessImportUseCase } from './application/use-cases/process-import.use-case';
import { EmitCertificateUseCase } from './application/use-cases/emit-certificate.use-case';
import { PrismaCertificateRepository } from './infrastructure/repositories/certificate.prisma.repository';
import { PrismaPersonRepository } from './infrastructure/repositories/person.prisma.repository';
import { PdfGeneratorService } from './infrastructure/services/pdf-generator.service';
import { StorageService } from './infrastructure/services/storage.service';
import { QrService } from './infrastructure/services/qr.service';
import { GeneratePdfUseCase } from './application/use-cases/generate-pdf.use-case';
import { SearchHistoryUseCase } from './application/use-cases/search-history.use-case';

@Module({
  controllers: [CertificateController],
  providers: [
    CestService,
    SifmService,
    ProcessImportUseCase,
    EmitCertificateUseCase,
    GeneratePdfUseCase,
    SearchHistoryUseCase,
    PdfGeneratorService,
    StorageService,
    QrService,
    {
      provide: 'ICertificateRepository',
      useClass: PrismaCertificateRepository,
    },
    {
      provide: 'IPersonRepository',
      useClass: PrismaPersonRepository,
    },
  ],
  exports: [
    ProcessImportUseCase,
    EmitCertificateUseCase,
    GeneratePdfUseCase,
    SearchHistoryUseCase,
  ],
})
export class CertificateModule {}
