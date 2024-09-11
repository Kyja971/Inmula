import { PostTypeEnum } from './post-type-enum';

export type PostType = {
  id: number;
  title: string;
  postedAt: Date;
  content: string;
  media?: string;
  type: PostTypeEnum;
  authorId: string;
  author?: object;
};
