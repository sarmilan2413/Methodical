import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.usersService.findByEmail(dto.email);
		if (existingUser) {
			throw new ConflictException('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const user = await this.usersService.create({
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
		});

		const accessToken = await this.signToken({ sub: user.id, email: user.email });

		return {
			accessToken,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			},
		};
	}

	async login(dto: LoginDto) {
		const user = await this.usersService.findByEmail(dto.email);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await bcrypt.compare(dto.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const accessToken = await this.signToken({ sub: user.id, email: user.email });

		return {
			accessToken,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
			},
		};
	}

	private signToken(payload: JwtPayload): Promise<string> {
		return this.jwtService.signAsync(payload);
	}
}
