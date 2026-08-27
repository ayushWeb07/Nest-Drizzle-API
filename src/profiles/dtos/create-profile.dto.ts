import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsInt()
  @IsDefined()
  age: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(35)
  @MaxLength(2500)
  bio: string;

  @IsInt()
  @IsDefined()
  userId: number;
}
