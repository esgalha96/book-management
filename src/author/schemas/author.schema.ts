// src/author/schemas/author.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
