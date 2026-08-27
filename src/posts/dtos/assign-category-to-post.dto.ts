import { IsDefined, IsInt } from 'class-validator';

export class AssignCategoryToPostDto {
  @IsInt()
  @IsDefined()
  postId: number;

  @IsInt()
  @IsDefined()
  categoryId: number;
}
