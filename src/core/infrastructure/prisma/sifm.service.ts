import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@sifm/client';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
@Injectable()
export class SifmService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super({
      adapter: new PrismaMariaDb({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectionLimit: 5,
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