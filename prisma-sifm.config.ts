import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma-sifm/schema.prisma',
  migrations: {
    path: 'prisma-sifm/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL_SIFM,
  },
});