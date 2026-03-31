import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTaskDto, userId: number): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        userId,
      },
    });
  }

  findAllByUserId(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOneById(id: number, userId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({ where: { id, userId } });
  }

  update(id: number, dto: UpdateTaskDto, userId: number): Promise<Task> {
    return this.prisma.$transaction(async (tx) => {
      const existingTask = await tx.task.findFirst({ where: { id, userId } });
      if (!existingTask) {
        throw new NotFoundException('Task not found');
      }

      return tx.task.update({
        where: { id },
        data: dto,
      });
    });
  }

  remove(id: number, userId: number): Promise<Task> {
    return this.prisma.$transaction(async (tx) => {
      const existingTask = await tx.task.findFirst({ where: { id, userId } });
      if (!existingTask) {
        throw new NotFoundException('Task not found');
      }

      return tx.task.delete({ where: { id } });
    });
  }
}
