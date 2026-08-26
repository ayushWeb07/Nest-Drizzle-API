import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { posts, users } from '../../database/schemas';
import { eq } from 'drizzle-orm';
import { FindPostByIdDto } from '../dtos/find-post-by-id.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from '../../users/services/users.service';
import { InsertPostType, SelectPostType } from '../../database/types/post.type';
import { SelectUserType } from '../../database/types/user.type';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly usersService: UsersService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<InsertPostType> {
    // check if such user exist
    const existingUser = await this.usersService.findUserById({
      id: createPostDto.authorId,
    });

    if (existingUser) {
      throw new NotFoundException('Such user does not exist');
    }

    // insert the post into the db
    const [newPost] = await this.db
      .insert(posts)
      .values(createPostDto)
      .returning();

    return newPost;
  }

  async findAllPosts(): Promise<
    { users: SelectUserType; posts: SelectPostType }[]
  > {
    // query the users from the db
    return await this.db
      .select()
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id));
  }

  async findPostById(
    findPostByIdDto: FindPostByIdDto,
  ): Promise<{ users: SelectUserType; posts: SelectPostType }> {
    // query the post from the db
    const [fetchedPost] = await this.db
      .select()
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
