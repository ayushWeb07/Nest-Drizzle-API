import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @IsDefined()
  id: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
