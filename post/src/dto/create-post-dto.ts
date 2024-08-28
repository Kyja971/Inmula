import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { PostTypeEnum } from 'src/types/post-type-enum';

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

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
