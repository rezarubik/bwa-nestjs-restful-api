import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { News } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}
  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: createNewsDto.author_id },
    });
    if (!existingUser) {
      throw new NotFoundException(
        `User with ID ${createNewsDto.author_id} not found`,
      );
    }
    return this.prismaService.news.create({
      data: {
        title: createNewsDto.title,
        content: createNewsDto.content,
        authorId: createNewsDto.author_id,
      },
    });
  }

  async findAll() {
    return await this.prismaService.news.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<News | null> {
    const news = await this.prismaService.news.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News | null> {
    await this.findOne(id);
    return await this.prismaService.news.update({
      where: { id },
      data: {
        title: updateNewsDto.title,
        content: updateNewsDto.content,
        authorId: updateNewsDto.author_id,
      },
    });
  }

  async remove(id: number): Promise<News | null> {
    await this.findOne(id);
    return await this.prismaService.news.delete({
      where: { id },
    });
  }
}
