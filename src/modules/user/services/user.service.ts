import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { IUser } from '../interfaces';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../database/repositories/user';
import { classToClass } from 'class-transformer';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public async findById(id: string, currentUser: IUser): Promise<IUser> {
		if (id !== currentUser.id) {
			throw new UnauthorizedException('Acesso negado');
		}

		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new NotFoundException('Usuário não encontrado');
		}

		return classToClass(user);
	}

	public async create(model: Omit<IUser, 'id'>): Promise<IUser> {
		const isEmailAvailable = await this.userRepository.isEmailAvailable(
			model.email,
		);
		if (!isEmailAvailable)
			throw new ConflictException('Email indisponível');

		const hashedPassword = bcrypt.hashSync(
			model.password,
			bcrypt.genSaltSync(),
		);

		const user = await this.userRepository.createUser({
			...model,
			password: hashedPassword,
		});

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
			throw new UnauthorizedException('Acesso negado');
		}

		if (user.email !== model.email) {
			const isEmailAvailable = await this.userRepository.isEmailAvailable(
				model.email,
			);
			if (!isEmailAvailable)
				throw new ConflictException('Email indisponível');
		}

		const userUpdated = await this.userRepository.updateUser(id, {
			...user,
			...model,
		});
		return classToClass(userUpdated);
	}
}
