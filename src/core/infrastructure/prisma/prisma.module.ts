// src/core/infrastructure/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { CestService } from './cest.service';
import { SifmService } from './sifm.service';

@Global()
@Module({
  providers: [CestService, SifmService],
  exports: [CestService, SifmService],
})
export class PrismaModule {}