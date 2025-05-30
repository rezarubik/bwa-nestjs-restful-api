import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from '@prisma/client';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return await this.newsService.create(createNewsDto);
  }

  @Get()
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<News | null> {
    return await this.newsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News | null> {
    return await this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<News | null> {
    return await this.newsService.remove(+id);
  }
}
