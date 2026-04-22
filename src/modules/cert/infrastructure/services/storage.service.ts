import {
  Injectable,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService implements OnModuleInit {
  private base64Image: string = '';

  onModuleInit() {
    try {
      const imagePath = path.join(process.cwd(), 'assets', 'cbimage.png');
      const buffer = fs.readFileSync(imagePath);
      this.base64Image = buffer.toString('base64');
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudo cargar la imagen de fondo (cbimage.png). Verifica la ruta.',
      );
    }
  }

  getBackgroundBase64(): string {
    return this.base64Image;
  }
}
