import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { IUser } from '../interfaces';

export class UpdateValidator implements Omit<IUser, 'id'> {
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(50)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 3,
		maxLength: 50,
	})
	public name: string;

	@IsNotEmpty()
	@IsEmail()
	@MaxLength(150)
	@ApiProperty({ required: true, type: 'string', maxLength: 150 })
	public email: string;
}

export class CreateValidator extends UpdateValidator {
	@IsNotEmpty()
	@MaxLength(150)
	@ApiProperty({ required: true, type: 'string', maxLength: 150 })
	public password: string;
}
