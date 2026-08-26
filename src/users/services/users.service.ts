import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/index';
import { CreateUserDto } from '../dtos/create-user.dto';
import { users } from '../../database/schemas';
import { eq } from 'drizzle-orm';
import { CheckEmailExistsDto } from '../dtos/check-email-exists.dto';
import { InsertUserType } from '../../database/types/user.type';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async checkEmailExists(
    checkEmailExistsDto: CheckEmailExistsDto,
  ): Promise<boolean> {
    // query the db to find the user by email
    const user = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, checkEmailExistsDto.email))
      .limit(1);

    if (!user || user.length === 0) {
      return false;
    }

    return true;
  }

  async createUser(createUserDto: CreateUserDto): Promise<InsertUserType> {
    // check if such email already exists
    const emailExists = await this.checkEmailExists({
      email: createUserDto.email,
    });

    if (emailExists) {
      throw new ConflictException('Such email already exists');
    }

    // insert the user into the db
    const [newUser] = await this.db
      .insert(users)
      .values(createUserDto)
      .returning();

    return newUser;
  }

  async findAllUsers() {}

  async findUserById() {}
}
