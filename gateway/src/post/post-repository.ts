import { PostType } from './models/post.type';

export class PostRepository {
  private _post: Array<PostType> = [];

  constructor() {
    this.populate();
  }

  findAll(): Array<PostType> {
    return this._post;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(id: number): PostType | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(intern: PostType): PostType {
    throw new Error('Not implemented yet');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: number): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_post: PostType): void {}

  private populate(): void {
    this._post.push(
      {
        id: 1,
        postedAt: new Date(2024, 8, 24),
        media: 'https://www.dummyimage.com/345x72/000/fff.jpg',
        content: 'je décris la zone de jacky',
        autor: {
          id: 1,
          lastname: 'Jacky',
          firstname: 'hoton',
          occupation: 'Lead Tech',
          company: {
            id: 1,
            name: 'Aelion',
          },
          poe: {
            id: 1,
            name: 'POEC dev Mobile',
            beginAt: new Date(2024, 5, 24),
            endAt: new Date(2024, 8, 24),
          },
        },
      },
      {
        id: 2,
        postedAt: new Date(2024, 2, 10),
        media: 'https://www.dummyimage.com/320x72/000/fff.jpg',
        content: 'Ceci est un second test de rachid',
        autor: {
          id: 1,
          lastname: 'Rachid',
          firstname: 'Remil',
          occupation: 'Développeur',
          company: {
            id: 1,
            name: 'Airbus',
          },
          poe: {
            id: 1,
            name: 'POEI dev Mobile',
            beginAt: new Date(2022, 10, 24),
            endAt: new Date(2023, 3, 10),
          },
        },
      },
      {
        id: 3,
        postedAt: new Date(2024, 8, 20),
        media: 'Image test 3',
        content: 'Ceci est le second test de jacky',
        autor: {
          id: 1,
          lastname: 'Jacky',
          firstname: 'hoton',
          occupation: 'Lead Tech',
          company: {
            id: 1,
            name: 'Aelion',
          },
          poe: {
            id: 1,
            name: 'POEC dev Mobile',
            beginAt: new Date(2024, 5, 24),
            endAt: new Date(2024, 8, 24),
          },
        },
      },
    );
  }
}
