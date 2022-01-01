import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { ICompany } from '../../company/interfaces';
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

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
