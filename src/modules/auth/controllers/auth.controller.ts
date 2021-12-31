import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DBUser } from '../../database/entities/user';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { LoginValidator } from '../validators/login';

@ApiTags('Auth')
@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	@ApiResponse({ status: 200, type: DBUser })
	@ApiBody({ type: LoginValidator })
	public async login(@Request() req: any) {
		return this.authService.login(req.user);
	}
}
