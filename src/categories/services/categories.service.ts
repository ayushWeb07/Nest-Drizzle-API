import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { categories, postCategories } from '../../database/schemas';
import { SelectCategoryType } from '../../database/types/category.type';
import { FindCategoryByIdDto } from '../dtos/find-category-by-id.dto';
import { eq } from 'drizzle-orm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { AssignCategoryToPostDto } from '../../posts/dtos/assign-category-to-post.dto';
import { PostsService } from '../../posts/services/posts.service';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly postsService: PostsService,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    // insert the category into the db
    const [newCategory] = await this.db
      .insert(categories)
      .values(createCategoryDto)
      .returning();

    return newCategory;
  }

  async assignCategoryToPost(
    assignCategoryToPostDto: AssignCategoryToPostDto,
  ): Promise<void> {
    // check if such post exist
    await this.postsService.findPostById({
      id: assignCategoryToPostDto.postId,
    });

    // check if such category exist
    await this.findCategoryById({
      id: assignCategoryToPostDto.categoryId,
    });

    // assign them inside db
    await this.db.insert(postCategories).values(assignCategoryToPostDto);
  }

  async findAllCategories(): Promise<SelectCategoryType[]> {
    return await this.db.select().from(categories);
  }

  async findCategoryById(
    findCategoryByIdDto: FindCategoryByIdDto,
  ): Promise<SelectCategoryType> {
    // query the category from the db
    const [fetchedCategory] = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, findCategoryByIdDto.id));

    if (!fetchedCategory) {
      throw new NotFoundException('Category with such id does not exist');
    }

    return fetchedCategory;
  }
}
