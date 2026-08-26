import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV ?? 'development';
const ENV_FILE_PATH = `.env.${NODE_ENV}`;
dotenv.config({ path: ENV_FILE_PATH });

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schemas/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
