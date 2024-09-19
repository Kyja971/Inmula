import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly internId: string;

  @IsString()
  readonly postId: number;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsDate()
  @IsNotEmpty()
  readonly postedAt: Date = new Date();
}
