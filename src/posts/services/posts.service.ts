import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { posts, users } from '../../database/schemas';
import { eq, getTableColumns } from 'drizzle-orm';
import { FindPostByIdDto } from '../dtos/find-post-by-id.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from '../../users/services/users.service';
import { InsertPostType, SelectPostType } from '../../database/types/post.type';
import { SelectUserType } from '../../database/types/user.type';
import { SelectPostAuthorType } from '../../database/types/post_author.type';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly usersService: UsersService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<InsertPostType> {
    // check if such user exist
    await this.usersService.findUserById({
      id: createPostDto.authorId,
    });

    // insert the post into the db
    const [newPost] = await this.db
      .insert(posts)
      .values(createPostDto)
      .returning();

    return newPost;
  }

  async findAllPosts(): Promise<SelectPostAuthorType[]> {
    // query the users from the db
    return await this.db
      .select({
        ...getTableColumns(posts),
        author: {
          ...getTableColumns(users),
        },
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id));
  }

  async findPostById(
    findPostByIdDto: FindPostByIdDto,
  ): Promise<SelectPostAuthorType> {
    // query the post from the db
    const [fetchedPost] = await this.db
      .select({
        ...getTableColumns(posts),
        author: {
          ...getTableColumns(users),
        },
      })
      .from(posts)
      .where(eq(posts.id, findPostByIdDto.id))
      .innerJoin(users, eq(posts.authorId, users.id));

    if (!fetchedPost) {
      throw new NotFoundException('Post with such id does not exist');
    }

    return fetchedPost;
  }

  async updatePost() {}

  async deletePost() {}
}
