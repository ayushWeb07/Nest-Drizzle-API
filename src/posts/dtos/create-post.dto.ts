import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(35)
  @MaxLength(2500)
  content: string;

  @IsInt()
  @IsDefined()
  authorId: number;
}
