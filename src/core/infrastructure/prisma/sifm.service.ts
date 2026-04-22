import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// Importamos desde la ruta específica que definiste en el output de tu schema-sifm
import { PrismaClient } from 'sifm-client';

@Injectable()
export class SifmService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
