import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InsertPostType, SelectPostType } from '../database/types/post.type';
import { SelectUserType } from '../database/types/user.type';
import { FindPostByIdDto } from './dtos/find-post-by-id.dto';
import { SelectPostAuthorType } from '../database/types/post_author.type';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createPostDto: CreatePostDto) {
    // call the create post service
    const newPost: InsertPostType =
      await this.postsService.createPost(createPostDto);

    return {
      success: true,
      message: 'Successfully created the new post',
      data: newPost,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPosts() {
    // call the fetch all posts service
    const fetchedPosts: SelectPostAuthorType[] =
      await this.postsService.findAllPosts();

    return {
      success: true,
      message: 'Successfully fetched all the posts',
      data: fetchedPosts,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findPostById(@Param() findPostByIdDto: FindPostByIdDto) {
    // call the fetch post by id service
    const fetchedPost: SelectPostAuthorType =
      await this.postsService.findPostById(findPostByIdDto);

    return {
      success: true,
      message: 'Successfully fetched the post by id',
      data: fetchedPost,
    };
  }
}
