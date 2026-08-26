import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindPostByIdDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
