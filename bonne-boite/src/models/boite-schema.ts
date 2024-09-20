import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Boite {
  @Prop()
  internId: string;

  @Prop()
  companies: Array<number>;
}

export const BoiteSchema = SchemaFactory.createForClass(Boite);
