import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const ENV_FILE_PATH = `.env.${NODE_ENV}`;
dotenv.config({ path: ENV_FILE_PATH });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
