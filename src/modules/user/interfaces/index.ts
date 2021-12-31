export interface IUser {
	id: string;
	name: string;
	email: string;
	password?: string;
	createdDate?: Date;
	updatedDate?: Date;
}
