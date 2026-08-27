import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { categories } from '../../database/schemas';
import { SelectCategoryType } from '../../database/types/category.type';
import { FindCategoryByIdDto } from '../dtos/find-category-by-id.dto';
import { eq } from 'drizzle-orm';
import { CreateCategoryDto } from '../dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    // insert the category into the db
    const [newCategory] = await this.db
      .insert(categories)
      .values(createCategoryDto)
      .returning();

    return newCategory;
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
