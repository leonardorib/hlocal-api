import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { ILocation } from '../../location/interfaces';
import { DBCompany } from './company';

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

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
