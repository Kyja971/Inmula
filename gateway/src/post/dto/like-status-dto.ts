import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LikeStatusDto {
  @IsString()
  @IsNotEmpty()
  readonly internId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly postId: number;
}
