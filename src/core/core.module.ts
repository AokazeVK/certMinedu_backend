// src/core/core.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [], 
  exports: [PrismaModule], 
})
export class CoreModule {}