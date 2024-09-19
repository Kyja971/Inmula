export interface Getable {
  findAll(): any;
  findOne(id: string | number): any;
}
