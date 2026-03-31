import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('me')
	async findMe(@CurrentUser() user: JwtPayload) {
		const userProfile = await this.usersService.findById(user.sub);
		if (!userProfile) {
			throw new NotFoundException('User not found');
		}
		return userProfile;
	}
}
