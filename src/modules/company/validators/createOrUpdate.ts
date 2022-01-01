import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	Validate,
} from 'class-validator';
import { CustomValidateCNPJ } from './custom/cnpj';
import { ICompany } from '../interfaces';

export class CreateOrUpdateValidator implements Omit<ICompany, 'id'> {
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
	@IsString()
	@MinLength(3)
	@MaxLength(300)
	@ApiProperty({
		required: true,
		type: 'string',
		minLength: 3,
		maxLength: 300,
	})
	public description: string;

	@Validate(CustomValidateCNPJ, { always: true })
	@ApiProperty({
		required: true,
		type: 'string',
		example: '65.240.834/0001-10',
	})
	public cnpj: string;
}
