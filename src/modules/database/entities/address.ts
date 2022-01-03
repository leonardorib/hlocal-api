import { Column } from 'typeorm';
import { IAddress } from '../../shared/interfaces/address';

export class DBAddress implements IAddress {
	@Column({ type: 'text', name: '_cep' })
	public cep: string;

	@Column({ type: 'text', name: '_state' })
	public state: string;

	@Column({ type: 'text', name: '_city' })
	public city: string;

	@Column({ type: 'text', name: '_street' })
	public street: string;

	@Column({ type: 'int', name: '_street_number' })
	public streetNumber: number;

	@Column({ type: 'text', name: '_neighborhood' })
	public neighborhood: string;
}
