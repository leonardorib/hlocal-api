import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	Length,
	IsInt,
	IsPositive,
} from 'class-validator';
import { ILocation } from '../interfaces';

export class CreateOrUpdateValidator
	implements Omit<ILocation, 'id' | 'company' | 'addressFormatted'>
{
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
}
