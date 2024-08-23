export type PostType = {
  id?: number;
  title: string;
  postedAt: Date;
  content: string;
  media: string;
  type: string;
  authorId: string;
  author?: object;

  // {
  //   id: string;
  //   lastname: string;
  //   firstname: string;
  //   occupation: string;
  //   gender: string;
  //   emails: Array<string>;
  //   phonenumber: string;
  //   company: {
  //     id: number | string;
  //     name: string;
  //   };
  //   poe: {
  //     id: number | string;
  //     beginAt: Date;
  //     endAt: Date;
  //     name: string;
  //     type?: string;
  //   };
  // };
};
