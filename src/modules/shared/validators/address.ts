import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	Length,
	IsInt,
} from 'class-validator';
import { IAddress } from '../interfaces/address';

export class AddressValidator implements IAddress {
	@IsNotEmpty()
	@IsString()
	@Length(8)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 8,
		maxLength: 8,
	})
	public cep: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(20)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 1,
		maxLength: 20,
	})
	public state: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(40)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 1,
		maxLength: 40,
	})
	public city: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(100)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 1,
		maxLength: 100,
	})
	public street: string;

	@IsNotEmpty()
	@IsInt()
	@ApiProperty({
		required: true,
		type: 'integer',
	})
	public streetNumber: number;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(100)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 1,
		maxLength: 100,
	})
	public neighborhood: string;
}
