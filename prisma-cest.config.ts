import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma-cest/schema.prisma',
  migrations: {
    path: 'prisma-cest/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL_CEST,
  },
});