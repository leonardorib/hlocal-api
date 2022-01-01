import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../user/interfaces';
import { DBCompany } from './company';
@Entity('users')
export class DBUser implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@OneToMany(() => DBCompany, (dbCompany) => dbCompany.user)
	public companies: Promise<DBCompany>;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
