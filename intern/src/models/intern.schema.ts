import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CompanyType } from '../Types/company/company.type';
import { PoeType } from '../Types/poe/poe.type';

@Schema()
export class Intern {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  gender: string;

  @Prop()
  emails: Array<string>;

  @Prop()
  phonenumber: string;

  @Prop()
  function: string;

  @Prop({ default: false, type: MongooseSchema.Types.Mixed })
  company: CompanyType;

  @Prop({ type: MongooseSchema.Types.Mixed })
  poe: PoeType;
}

export const InternSchema = SchemaFactory.createForClass(Intern);
