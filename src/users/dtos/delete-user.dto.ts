import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteUserDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
