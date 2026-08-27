import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindProfileByIdDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
