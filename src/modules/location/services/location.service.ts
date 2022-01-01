import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ICreateLocation, ILocation, IUpdateLocation } from '../interfaces';
import { IUser } from '../../user/interfaces';

import { CompanyRepository } from '../../database/repositories/company';
import { IPaginationResponse } from 'modules/shared/interfaces/pagination';
import { LocationRepository } from '../../database/repositories/location';
import { AddressService } from '../../shared/services/address.service';

@Injectable()
export class LocationService {
	constructor(
		private locationRepository: LocationRepository,
		private companyRepository: CompanyRepository,
		private addressService: AddressService,
	) {}

	public async findById(id: string, currentUser: IUser): Promise<ILocation> {
		const location = await this.locationRepository.findById(id);

		if (!location) {
			throw new NotFoundException('location-not-found');
		}

		if (location.company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		return location;
	}

	public async findAllByCompany(
		page: number,
		companyId: string,
		currentUser: IUser,
	): Promise<IPaginationResponse<ILocation>> {
		const company = await this.companyRepository.findById(companyId);

		if (!company) throw new NotFoundException('company-not-found');
		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		return this.locationRepository.findAllByCompany(company, page, 20);
	}

	public async create(
		createLocation: ICreateLocation,
		currentUser: IUser,
	): Promise<ILocation> {
		const { addressCep, addressNumber, name, companyId } = createLocation;

		const company = await this.companyRepository.findById(companyId);
		if (!company) throw new NotFoundException('company-not-found');
		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		const { cep, formattedAddress } =
			await this.addressService.getFormattedAddress(
				addressCep,
				addressNumber,
			);

		return this.locationRepository.createLocation(
			{
				name,
				addressCep: cep,
				addressFormatted: formattedAddress,
			},
			company,
		);
	}

	public async update(
		id: string,
		updateLocation: IUpdateLocation,
		currentUser: IUser,
	): Promise<ILocation> {
		const { name, addressCep, addressNumber } = updateLocation;

		const location = await this.locationRepository.findById(id);
		if (!location) {
			throw new NotFoundException('location-not-found');
		}
		if (location.company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		let newCep = addressCep;
		let newAddress = location.addressFormatted;
		if (newCep !== location.addressCep) {
			const { cep, formattedAddress } =
				await this.addressService.getFormattedAddress(
					addressCep,
					addressNumber,
				);
			newCep = cep;
			newAddress = formattedAddress;
		}

		const locationUpdated = await this.locationRepository.updateLocation(
			id,
			{
				name,
				addressCep: newCep,
				addressFormatted: newAddress,
			},
		);

		return locationUpdated;
	}

	public async delete(id: string, currentUser: IUser): Promise<ILocation> {
		const location = await this.locationRepository.findById(id);

		if (!location) {
			throw new NotFoundException('location-not-found');
		}

		if (location.company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		return this.locationRepository.deleteLocation(id);
	}
}
