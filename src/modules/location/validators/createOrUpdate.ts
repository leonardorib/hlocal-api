import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MinLength,
	MaxLength,
	IsArray,
	ValidateNested,
	ArrayMinSize,
	ArrayMaxSize,
} from 'class-validator';
import { IResponsible } from '../../responsibles/interfaces';
import { CreateResponsibleValidator } from '../../responsibles/validators/create';
import { AddressValidator } from '../../shared/validators/address';
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

	@ValidateNested()
	@ApiProperty({
		required: true,
		type: AddressValidator,
	})
	public address: AddressValidator;

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
