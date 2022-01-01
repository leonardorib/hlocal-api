import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	Validate,
	IsArray,
	ValidateNested,
	ArrayMinSize,
	ArrayMaxSize,
} from 'class-validator';
import { CustomValidateCNPJ } from './custom/cnpj';
import { ICompany } from '../interfaces';
import { IResponsible } from '../../responsibles/interfaces';
import { CreateResponsibleValidator } from '../../responsibles/validators/create';

export class CreateOrUpdateCompanyValidator
	implements Omit<ICompany, 'id' | 'responsibles'>
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

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@ArrayMaxSize(30)
	@ApiProperty({
		required: true,
		type: [CreateResponsibleValidator],
	})
	public responsibles: IResponsible[];
}
