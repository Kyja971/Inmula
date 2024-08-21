/* eslint-disable @typescript-eslint/no-unused-vars */
import { InternType } from './models/intern.type';

export class InternRepository {
  private _interns: Array<InternType> = [];

  constructor() {
    this.populate();
  }

  findAll(): Array<InternType> {
    return this._interns;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(id: number): InternType | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(intern: InternType): InternType {
    throw new Error('Not implemented yet');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: number): void {}

  update(intern: InternType): void {}

  /**
   * Just for mock purpose
   * Populate a list with some fixed datas (fixture)
   */
  private populate(): void {
    this._interns.push({
      id: 1,
      lastname: 'Jacky',
      firstname: 'hoton',
      occupation: 'Développeur',
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
    });
    this._interns.push({
      id: 2,
      lastname: 'Rachid',
      firstname: 'Test',
      occupation: 'Tech lead',
      company: {
        id: 2,
        name: 'Aelion',
      },
      poe: {
        id: 2,
        name: 'POEC dev Test',
        beginAt: new Date(2022, 7, 24),
        endAt: new Date(2023, 8, 24),
      },
    });
  }
}
