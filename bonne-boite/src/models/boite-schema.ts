import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Boite {
  @Prop()
  test: string;

  @Prop()
  test2: string;
}

export const BoiteSchema = SchemaFactory.createForClass(Boite);
