import { IsEmail, IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class CheckEmailExistsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
