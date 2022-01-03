import { ICompany } from '../../company/interfaces';
import { ILocation } from '../../location/interfaces';
import { IAddress } from '../../shared/interfaces/address';

export interface IResponsible {
	id?: string;
	name: string;
	phone: string;

	address: IAddress;

	isMainResponsible: boolean;

	company?: ICompany | null;
	location?: ILocation | null;

	createdDate?: Date;
	updatedDate?: Date;
}

export interface ICreateResponsible {
	name: string;
	phone: string;
	address: IAddress;
}
