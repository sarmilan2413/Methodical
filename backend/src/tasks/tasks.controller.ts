import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	create(@Body() dto: CreateTaskDto) {
		return this.tasksService.create(dto);
	}

	@Get('user/:userId')
	findAllByUserId(@Param('userId', ParseIntPipe) userId: number) {
		return this.tasksService.findAllByUserId(userId);
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const task = await this.tasksService.findOneById(id);
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		return task;
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateTaskDto,
	) {
		return this.tasksService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.tasksService.remove(id);
	}
}
