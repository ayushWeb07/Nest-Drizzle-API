import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envsValidationSchema from './config/validations/envs.validation'
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidationSchema,
      load: [serverConfig, databaseConfig],
      envFilePath: `.env.${NODE_ENV}`,
    }),
  ],
  providers: [],
})
export class AppModule {}
