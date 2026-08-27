import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CategoriesModule } from './categories/categories.module';
import envsValidationSchema from './config/validations/envs.validation';
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
    DatabaseModule,
    UsersModule,
    PostsModule,
    ProfilesModule,
    CategoriesModule,
  ],
  providers: [],
})
export class AppModule {}
