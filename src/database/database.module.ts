import { Module } from '@nestjs/common';
import { DRIZZLE } from './constants';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '../config/interfaces/database_config.interface';
import { Pool } from 'pg';
import * as schema from './schemas/index';
import { drizzle } from 'drizzle-orm/node-postgres';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the database config
        const databaseConfig = configService.get<IDatabaseConfig>('database');

        if (!databaseConfig) {
          throw new Error('Database configuration must be setup');
        }

        // create a connection pool and drizzle instance
        const pool = new Pool({
          connectionString: databaseConfig.databaseUrl,
        });

        return drizzle({
          client: pool,
          schema,
        });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
