// src/book/schemas/book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Author } from '../../author/schemas/author.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;
}

export const BookSchema = SchemaFactory.createForClass(Book);
