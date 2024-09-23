import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContactType } from './contact.type';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class ContactCompany {
  @Prop()
  internId: string;

  @Prop()
  companyId: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  contact?: ContactType;
}

export const ContactSchema = SchemaFactory.createForClass(ContactCompany);
