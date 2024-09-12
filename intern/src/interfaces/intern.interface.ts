import { Document } from 'mongoose';

export interface InternInterface {
  readonly firstname: string;
  readonly lastname: string;
  readonly gender: string;
  readonly emails: Array<string>;
  readonly phonenumber: string;
  readonly function: string;
  readonly society: string;
  readonly poe: string;
}
export interface InternInterfaceDocument extends InternInterface, Document {}
