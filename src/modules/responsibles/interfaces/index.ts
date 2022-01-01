import { ICompany } from '../../company/interfaces';
import { ILocation } from '../../location/interfaces';

export interface IResponsible {
	id?: string;
	name: string;
	phone: string;

	addressFormatted: string;
	addressCep: string;

	isMainResponsible: boolean;

	company?: ICompany | null;
	location?: ILocation | null;

	createdDate?: Date;
	updatedDate?: Date;
}

export interface ICreateResponsible {
	name: string;
	phone: string;
	addressCep: string;
	addressFormatted: string;
}
