// src/book/book.controller.ts
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/book-update.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Post()
  async create(@Body() createBookDto: any) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto
  ): Promise<Book> {
    return this.bookService.update(updateBookDto);
  }

}
