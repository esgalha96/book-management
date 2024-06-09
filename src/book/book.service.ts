// src/book/book.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().populate('author').exec();
  }

  async create(createBookDto: any): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }
}
