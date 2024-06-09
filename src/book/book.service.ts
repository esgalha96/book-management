// src/book/book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/book-update.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().populate('author').exec();
  }

  async findOne(id: String): Promise<Book> {
    
    return this.bookModel.findById(id);
  }

  async create(createBookDto: any): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async delete(id: String): Promise<Boolean> {
    return this.bookModel.findByIdAndDelete(id);
  }

  async update(updateBookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.bookModel.findById(updateBookDto._id);
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${updateBookDto._id} not found`);
    }

    if (updateBookDto.name) {
      existingBook.name = updateBookDto.name;
    }

    if (updateBookDto.author) {
      existingBook.author = updateBookDto.author;
    }

    if (updateBookDto.pages) {
      existingBook.pages = updateBookDto.pages;
    }

    return existingBook.save();
  }

}
