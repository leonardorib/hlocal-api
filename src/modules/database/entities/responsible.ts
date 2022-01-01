import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { IResponsible } from '../../responsibles/interfaces';
import { DBCompany } from './company';
import { DBLocation } from './location';

@Entity('responsibles')
export class DBResponsible implements IResponsible {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public name: string;

	@Column()
	public phone: string;

	@Column()
	public addressCep: string;

	@Column('boolean', { default: false, nullable: false })
	public isMainResponsible: boolean;

	@Column()
	public addressFormatted: string;

	@ManyToOne(() => DBCompany, (dbCompany) => dbCompany.responsibles)
	public company: DBCompany | null;

	@ManyToOne(() => DBLocation, (dbLocation) => dbLocation.responsibles)
	public location: DBLocation | null;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
