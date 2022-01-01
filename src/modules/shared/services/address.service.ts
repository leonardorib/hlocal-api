import { Injectable } from '@nestjs/common';

const cepPromise = require('cep-promise');

export interface IAddress {
	cep: string;
	state: string;
	city: string;
	street: string;
	neighborhood: string;
}

export interface IAddressResponse {
	cep: string;
	formattedAddress: string;
}

@Injectable()
export class AddressService {
	constructor() {}

	private async getAddressFromCep(cep: string): Promise<IAddress> {
		return cepPromise(cep, {});
	}

	public async getFormattedAddress(
		addressCep: string,
		addressNumber: number,
	): Promise<IAddressResponse> {
		const { cep, state, city, street, neighborhood } =
			await this.getAddressFromCep(addressCep);

		const formattedAddress = `${street}, ${addressNumber}. ${neighborhood}. ${city}, ${state}. ${cep}`;

		return { cep, formattedAddress };
	}
}
