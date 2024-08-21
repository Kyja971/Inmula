import { InternType } from "../intern/intern-type";

export type PostType = {
  id?: number;
  title?: string;
  postedAt: Date;
  media?: string;
  content: string;
  autor: InternType;
  };