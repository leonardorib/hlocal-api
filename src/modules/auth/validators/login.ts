import { ApiProperty } from '@nestjs/swagger';
import * as Validator from 'class-validator';

export class LoginValidator {
	@Validator.IsNotEmpty()
	@Validator.IsEmail()
	@ApiProperty({ required: true, type: 'string' })
	public email: string;

	@Validator.IsNotEmpty()
	@Validator.IsString()
	@ApiProperty({ required: true, type: 'string' })
	public password: string;
}
