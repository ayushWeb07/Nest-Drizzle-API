import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import {
  InsertCategoryType,
  SelectCategoryType,
} from '../database/types/category.type';
import { FindCategoryByIdDto } from './dtos/find-category-by-id.dto';
import { AssignCategoryToPostDto } from '../posts/dtos/assign-category-to-post.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    // call the create category service
    const newCategory: InsertCategoryType =
      await this.categoriesService.createCategory(createCategoryDto);

    return {
      success: true,
      message: 'Successfully created the new category',
      data: newCategory,
    };
  }

  @Post('assign-post')
  @HttpCode(HttpStatus.OK)
  async assignCategoryToPost(
    @Body() assignCategoryToPostDto: AssignCategoryToPostDto,
  ) {
    // call the create category service
    await this.categoriesService.assignCategoryToPost(assignCategoryToPostDto);

    return {
      success: true,
      message: 'Successfully assigned the category to the post',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllCategories() {
    // call the fetch all posts service
    const fetchedCategories: SelectCategoryType[] =
      await this.categoriesService.findAllCategories();

    return {
      success: true,
      message: 'Successfully fetched all the categories',
      data: fetchedCategories,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findCategoryById(@Param() findCategoryByIdDto: FindCategoryByIdDto) {
    // call the fetch category by id service
    const fetchedCategory: SelectCategoryType =
      await this.categoriesService.findCategoryById(findCategoryByIdDto);

    return {
      success: true,
      message: 'Successfully fetched the category by id',
      data: fetchedCategory,
    };
  }
}
