import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { InsertUserType, SelectUserType } from '../database/types/user.type';
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    // call the create user service
    const newUser: InsertUserType =
      await this.usersService.createUser(createUserDto);

    return {
      success: true,
      message: 'Successfully created the new user',
      data: newUser,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    // call the fetch all users service
    const fetchedUsers: SelectUserType[] =
      await this.usersService.findAllUsers();

    return {
      success: true,
      message: 'Successfully fetched all the users',
      data: fetchedUsers,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param() findUserByIdDto: FindUserByIdDto) {
    // call the fetch user by id service
    const fetchedUser: SelectUserType =
      await this.usersService.findUserById(findUserByIdDto);

    return {
      success: true,
      message: 'Successfully fetched the user by id',
      data: fetchedUser,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param() deleteUserDto: DeleteUserDto) {
    // call the delete user service
    await this.usersService.deleteUser(deleteUserDto);

    return {
      success: true,
      message: 'Successfully deleted the user by id',
    };
  }
}
