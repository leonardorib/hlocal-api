import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { IUser } from '../interfaces';

import { UserRepository } from '../../database/repositories/user';
import { classToClass } from 'class-transformer';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public async findById(id: string, currentUser: IUser): Promise<IUser> {
		if (id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new NotFoundException('user-not-found');
		}

		return classToClass(user);
	}

	public async create(model: Omit<IUser, 'id'>): Promise<IUser> {
		const isEmailAvailable = await this.userRepository.isEmailAvailable(
			model.email,
		);
		if (!isEmailAvailable) throw new ConflictException('email-unavailable');

		const user = await this.userRepository.createUser(model);

		return classToClass(user);
	}

	public async update(
		id: string,
		model: Omit<IUser, 'id'>,
		currentUser: IUser,
	): Promise<IUser> {
		console.log('currentUser', currentUser);
		const user = await this.userRepository.findById(currentUser.id);

		if (user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		if (user.email !== model.email) {
			const isEmailAvailable = await this.userRepository.isEmailAvailable(
				model.email,
			);
			if (!isEmailAvailable)
				throw new ConflictException('email-unavailable');
		}

		const userUpdated = await this.userRepository.updateUser(id, {
			...user,
			...model,
		});
		return classToClass(userUpdated);
	}
}
