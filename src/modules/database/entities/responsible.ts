import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { IResponsible } from '../../responsibles/interfaces';
import { DBAddress } from './address';
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

	@Column('boolean', { default: false, nullable: false })
	public isMainResponsible: boolean;

	@Column(() => DBAddress)
	public address: DBAddress;

	@ManyToOne(() => DBCompany, (dbCompany) => dbCompany.responsibles, {
		onDelete: 'CASCADE',
	})
	public company: DBCompany | null;

	@ManyToOne(() => DBLocation, (dbLocation) => dbLocation.responsibles, {
		onDelete: 'CASCADE',
	})
	public location: DBLocation | null;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
