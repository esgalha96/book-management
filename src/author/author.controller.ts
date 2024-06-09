// src/author/author.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll() {
    return this.authorService.findAll();
  }

  @Post()
  //@UseGuards(RolesGuard)
  //@Roles('admin')
  async create(@Body() createAuthorDto: any) {
    return this.authorService.create(createAuthorDto);
  }
}
