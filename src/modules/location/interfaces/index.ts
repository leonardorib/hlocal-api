import { ICompany } from '../../company/interfaces';
import { IResponsible } from '../../responsibles/interfaces';

export interface ILocation {
	id: string;
	name: string;
	addressFormatted: string;
	addressCep: string;

	responsibles: IResponsible[];

	company?: ICompany;
}

export interface IUpdateLocation {
	name: string;
	addressCep: string;
	addressNumber: number;
	responsibles: IResponsible[];
}

export interface ICreateLocation extends IUpdateLocation {
	companyId: string;
}
