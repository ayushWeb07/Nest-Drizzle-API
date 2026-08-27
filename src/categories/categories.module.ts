import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { DatabaseModule } from '../database/database.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [DatabaseModule, PostsModule],
})
export class CategoriesModule {}
