import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas/index';
import { CreateUserDto } from '../dtos/create-user.dto';
import { users } from '../../database/schemas';
import { eq } from 'drizzle-orm';
import { CheckEmailExistsDto } from '../dtos/check-email-exists.dto';
import { InsertUserType, SelectUserType } from '../../database/types/user.type';
import { FindUserByIdDto } from '../dtos/find-user-by-id.dto';
import { DeleteUserDto } from '../dtos/delete-user.dto';

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

  async findAllUsers(): Promise<SelectUserType[]> {
    // query the users from the db
    return await this.db.select().from(users);
  }

  async findUserById(
    findUserByIdDto: FindUserByIdDto,
  ): Promise<SelectUserType> {
    // query the user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, findUserByIdDto.id));

    if (!fetchedUser) {
      throw new NotFoundException('User with such id does not exist');
    }

    return fetchedUser;
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<void> {
    // query the user from the db
    const [fetchedUser] = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, deleteUserDto.id));

    if (!fetchedUser) {
      throw new NotFoundException('User with such id does not exist');
    }

    // delete the user
    await this.db.delete(users).where(eq(users.id, deleteUserDto.id));
  }
}
