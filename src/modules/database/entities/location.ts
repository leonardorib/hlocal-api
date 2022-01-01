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
import { DBCompany } from './company';
import { DBResponsible } from './responsible';

@Entity('locations')
export class DBLocation implements ILocation {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	addressCep: string;

	@Column()
	addressFormatted: string;

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
