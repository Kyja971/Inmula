import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { PostTypeEnum } from '../models/post-type-enum';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsDate()
  @Type(() => Date)
  readonly postedAt: Date;

  @IsString()
  readonly content: string;

  @IsString()
  readonly media: string;

  @IsEnum(PostTypeEnum)
  readonly type: PostTypeEnum;

  @IsString()
  @IsNotEmpty()
  readonly authorId: string;

  author?: object;
}
