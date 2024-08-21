import { InternInterface } from './intern.interface';

export interface Crud {
  findAll(): Promise<InternInterface[]>;
  findOne(id: any): Promise<InternInterface | null>;
  add(intern: any): Promise<InternInterface>;
  update(id: any, intern: InternInterface): Promise<InternInterface | null>;
  delete(id: any): Promise<InternInterface | null>;
}
