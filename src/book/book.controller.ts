// src/book/book.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';

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
}
