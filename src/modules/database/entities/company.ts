import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { ICompany } from '../../company/interfaces';
import { DBLocation } from './location';
import { DBResponsible } from './responsible';
import { DBUser } from './user';

@Entity('companies')
export class DBCompany implements ICompany {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	cnpj: string;

	@ManyToOne(() => DBUser, (dbUser) => dbUser.companies, { eager: true })
	public user: DBUser;

	@OneToMany(() => DBLocation, (dbLocation) => dbLocation.company)
	public locations: DBLocation[];

	@OneToMany(() => DBResponsible, (dbResponsible) => dbResponsible.company, {
		eager: true,
		cascade: true,
	})
	public responsibles: DBResponsible[];

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
