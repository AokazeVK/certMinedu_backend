import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificateModule } from './modules/cert/certificate.module';

@Module({
  imports: [CertificateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
