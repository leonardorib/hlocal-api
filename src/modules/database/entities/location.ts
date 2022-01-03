import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { ILocation } from '../../location/interfaces';
import { DBAddress } from './address';
import { DBCompany } from './company';
import { DBResponsible } from './responsible';

@Entity('locations')
export class DBLocation implements ILocation {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public name: string;

	@Column(() => DBAddress)
	public address: DBAddress;

	@ManyToOne(() => DBCompany, (dbCompany) => dbCompany.locations, {
		eager: true,
	})
	public company: DBCompany;

	@OneToMany(() => DBResponsible, (dbResponsible) => dbResponsible.location, {
		eager: true,
		cascade: true,
	})
	public responsibles: DBResponsible[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
