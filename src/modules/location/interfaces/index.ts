import { ICompany } from '../../company/interfaces';

export interface ILocation {
	id: string;
	name: string;
	addressFormatted: string;
	addressCep: string;

	company: ICompany;
}

export interface IUpdateLocation {
	name: string;
	addressCep: string;
	addressNumber: number;
}

export interface ICreateLocation extends IUpdateLocation {
	companyId: string;
}
