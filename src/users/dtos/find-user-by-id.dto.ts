import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindUserByIdDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
