import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@cest/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class CestService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL_CEST,
      }),
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