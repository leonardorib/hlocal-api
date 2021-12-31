import {
	Injectable,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { classToClass } from 'class-transformer';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export const CurrentUser = createParamDecorator(
	(data, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();
		return classToClass(request.user);
	},
);
