import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Res,
  StreamableFile,
  Inject,
} from '@nestjs/common';
import type { Response } from 'express';
import { EmitCertificateUseCase } from '../../application/use-cases/emit-certificate.use-case';
import type { ICertificateRepository } from '../../domain/repositories/certificate.repository';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { StorageService } from '../services/storage.service';
import { QrService } from '../services/qr.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Certificados')
@Controller('certificates')
export class CertificateController {
  constructor(
    private readonly emitUseCase: EmitCertificateUseCase,
    private readonly pdfService: PdfGeneratorService,
    @Inject('ICertificateRepository')
    private readonly repo: ICertificateRepository,
    private readonly storage: StorageService,
    private readonly qrService: QrService,
  ) { }

  @Post('emit')
  async emit(
    @Body('tipo') tipo: 'TACFI' | 'TCLO',
    @Body('codigo_esfm', ParseIntPipe) cod: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.emitUseCase.execute({ tipo, codigo_esfm: cod, hoja_ruta: 0 });

    const students = await this.repo.getTempByEsfm(tipo, cod);
    const base64 = this.storage.getBackgroundBase64();

    const qrs = await Promise.all(
      students.map((s) =>
        this.qrService.generateQrBase64(`${s.codigoEstudiante}|${s.cedula}`),
      ),
    );

    const pdfBuffer = await this.pdfService.generateMultiCertificatePdf(
      tipo,
      students,
      base64,
      qrs,
    );

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Certificados_${tipo}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });

    return new StreamableFile(pdfBuffer);
  }
}
