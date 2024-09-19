import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'likeStatus',
})
export class LikeStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  internId: string;

  @Column()
  postId: number;
}
