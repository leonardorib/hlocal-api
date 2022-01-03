import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	IsPhoneNumber,
	IsBoolean,
	ValidateNested,
} from 'class-validator';
import { AddressValidator } from '../../shared/validators/address';
import { IResponsible } from '../interfaces';

export class CreateResponsibleValidator implements Omit<IResponsible, 'id'> {
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
	@IsBoolean()
	@ApiProperty({
		required: true,
		type: 'boolean',
	})
	public isMainResponsible: boolean;

	@IsString()
	@IsPhoneNumber('BR')
	@ApiProperty({
		required: true,
		type: 'string',
	})
	public phone: string;

	@ValidateNested()
	@ApiProperty({
		required: true,
		type: AddressValidator,
	})
	public address: AddressValidator;
}
