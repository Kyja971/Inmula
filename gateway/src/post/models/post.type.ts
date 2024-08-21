import { InternType } from 'src/intern/models/intern.type';

export type PostType = {
  id?: number;
  title?: string;
  postedAt: Date;
  media?: string;
  content: string;
  autor: InternType;
};
