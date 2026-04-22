import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { getCertificateLayout } from '../templates/certificate.layout';
import { getTacfiHtml } from '../templates/tacfi.template';
import { getTcloHtml } from '../templates/tclo.template';

@Injectable()
export class PdfGeneratorService {
  async generateMultiCertificatePdf(
    tipo: 'TACFI' | 'TCLO',
    students: any[],
    base64: string,
    qrs: string[],
  ): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const content =
      tipo === 'TACFI'
        ? getTacfiHtml(students, base64, qrs)
        : getTcloHtml(students, base64, qrs);
    const fullHtml = getCertificateLayout(content);

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'Letter', landscape: true });
    await browser.close();
    return Buffer.from(pdfBuffer);
  }
}
