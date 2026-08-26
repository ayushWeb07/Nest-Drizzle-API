import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Min(5)
  @Max(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Max(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(8)
  @Max(15)
  password: string;
}
