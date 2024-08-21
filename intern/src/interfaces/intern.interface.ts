import { Document } from 'mongoose';

export interface InternInterface extends Document {
  readonly firstname: string;
  readonly lastname: string;
  readonly gender: string;
  readonly emails: Array<string>;
  readonly phonenumber: string;
  readonly function: string;
  readonly society: string;
  readonly poe: string;
}
