import { IsEnum } from 'class-validator';
import { PostTypeEnum } from 'src/types/post-type-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'post',
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  postedAt: Date;

  @Column()
  content: string;

  @Column()
  media: string;

  @Column()
  @IsEnum(PostTypeEnum)
  type: PostTypeEnum;

  @Column()
  authorId: string;

  author?: object;
}
