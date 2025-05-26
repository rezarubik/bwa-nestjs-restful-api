import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.UserService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    const user = await this.UserService.getUserById(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    const user = await this.UserService.createUser(userData);
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: Partial<CreateUserDto>,
  ): Promise<User | null> {
    const user = await this.UserService.updateUser(Number(id), userData);
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User | null> {
    const user = await this.UserService.deleteUser(Number(id));
    return user;
  }
}
