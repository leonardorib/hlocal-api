import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	Length,
	IsInt,
	IsPositive,
	IsMobilePhone,
	IsBoolean,
} from 'class-validator';
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
	@IsMobilePhone()
	@ApiProperty({
		required: true,
		type: 'string',
	})
	public phone: string;

	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	@ApiProperty({
		required: true,
		type: 'integer',
	})
	public addressNumber: number;

	@IsNotEmpty()
	@IsString()
	@Length(8)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 8,
		maxLength: 8,
	})
	public addressCep: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(100)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 3,
		maxLength: 100,
	})
	public addressFormatted: string;
}
