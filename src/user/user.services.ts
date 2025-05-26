import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(protected primaService: PrismaService) {}

  //   note: Get List Users
  async getAllUsers(): Promise<User[]> {
    const users = await this.primaService.user.findMany();
    return users;
  }

  //   note: Get one user
  async getUserById(id: number): Promise<User | null> {
    const user = await this.primaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  //   note: Check user by email
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.primaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  //   note: Create new user
  async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new NotFoundException(
        `User with email ${userData.email} already exists`,
      );
    }
    const user = await this.primaService.user.create({
      data: userData,
    });
    return user;
  }

  //   note: Update User
  async updateUser(
    id: number,
    userData: Partial<CreateUserDto>,
  ): Promise<User | null> {
    await this.getUserById(id);
    const user = await this.primaService.user.update({
      where: { id },
      data: userData,
    });
    return user;
  }

  //   note: Delete User
  async deleteUser(id: number): Promise<User | null> {
    await this.getUserById(id);
    const user = await this.primaService.user.delete({
      where: { id },
    });
    return user;
  }
}
