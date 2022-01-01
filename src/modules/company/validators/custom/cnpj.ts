import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'customCnpj', async: false })
export class CustomValidateCNPJ implements ValidatorConstraintInterface {
	public validate(document: string): boolean {
		return cnpj.isValid(document);
	}

	defaultMessage() {
		return 'Invalid CNPJ';
	}
}
