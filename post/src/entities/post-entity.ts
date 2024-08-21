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
  type: string;

  @Column()
  author: string;
}
