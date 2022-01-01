import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DBUser } from '../../database/entities/user';
import { JwtAuthGuard, CurrentUser } from '../../auth/guards/jwt-auth.guard';

import { UserService } from '../services/user.service';
import { CreateValidator, UpdateValidator } from '../validators/createOrUpdate';
import { IUser } from '../interfaces';

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get(':userId')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 200, type: DBUser })
	@ApiBearerAuth()
	public async details(
		@Param('userId', ParseUUIDPipe) userId: string,
		@CurrentUser() currentUser: IUser,
	) {
		return this.userService.findById(userId, currentUser);
	}

	@Post()
	@ApiResponse({ status: 200, type: DBUser })
	public async create(@Body() model: CreateValidator) {
		return this.userService.create(model);
	}

	@Put(':userId')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBUser })
	public async update(
		@Param('userId', ParseUUIDPipe) userId: string,
		@Body() model: UpdateValidator,
		@CurrentUser() currentUser: IUser,
	) {
		return this.userService.update(userId, model, currentUser);
	}
}
