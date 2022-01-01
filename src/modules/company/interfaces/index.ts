import { IUser } from '../../user/interfaces';

export interface ICompany {
	id: string;
	name: string;
	cnpj: string;
	description: string;

	user?: IUser;
}
