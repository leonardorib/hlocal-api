import { ICompany } from '../../company/interfaces';
import { IResponsible } from '../../responsibles/interfaces';
import { IAddress } from '../../shared/interfaces/address';

export interface ILocation {
	id: string;
	name: string;
	address: IAddress;

	responsibles: IResponsible[];

	company?: ICompany;
}

export interface IUpdateLocation {
	name: string;
	address: IAddress;
	responsibles: IResponsible[];
}

export interface ICreateLocation extends IUpdateLocation {
	companyId: string;
}
