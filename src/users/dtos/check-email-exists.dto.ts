import { IsEmail, IsNotEmpty, IsString, Max } from 'class-validator';

export class CheckEmailExistsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Max(100)
  email: string;
}
