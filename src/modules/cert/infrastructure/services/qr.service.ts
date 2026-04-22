import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  async generateQrBase64(data: string): Promise<string> {
    return await QRCode.toDataURL(data, { width: 150, margin: 1 });
  }
}
