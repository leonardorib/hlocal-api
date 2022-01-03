import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../user/interfaces';
import { classToClass } from 'class-transformer';

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,

		private jwtService: JwtService,
	) {}

	public async validateUser(
		email: string,
		password: string,
	): Promise<IUser | null> {
		const user = await this.userRepository.findByEmail(email);

		if (user && bcrypt.compareSync(password, user.password)) {
			return classToClass(user);
		}
		return null;
	}

	public async login(user: IUser) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
