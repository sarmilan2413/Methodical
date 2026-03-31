import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: CreateTaskDto): Promise<Task> {
		return this.prisma.task.create({
			data: {
				title: dto.title,
				description: dto.description,
				status: dto.status,
				userId: dto.userId,
			},
		});
	}

	findAllByUserId(userId: number): Promise<Task[]> {
		return this.prisma.task.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});
	}

	findOneById(id: number): Promise<Task | null> {
		return this.prisma.task.findUnique({ where: { id } });
	}

	update(id: number, dto: UpdateTaskDto): Promise<Task> {
		return this.prisma.task.update({
			where: { id },
			data: dto,
		});
	}

	remove(id: number): Promise<Task> {
		return this.prisma.task.delete({ where: { id } });
	}
}
