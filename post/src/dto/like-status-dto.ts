import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LikeStatusDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly internId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly postId: number;
}
