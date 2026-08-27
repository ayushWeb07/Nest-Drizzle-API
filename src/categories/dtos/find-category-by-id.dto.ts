import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindCategoryByIdDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
