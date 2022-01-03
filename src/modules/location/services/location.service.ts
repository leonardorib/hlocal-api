import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ICreateLocation, ILocation, IUpdateLocation } from '../interfaces';
import { IUser } from '../../user/interfaces';

import { CompanyRepository } from '../../database/repositories/company';
import { IPaginationResponse } from 'modules/shared/interfaces/pagination';
import { LocationRepository } from '../../database/repositories/location';
import { IResponsible } from '../../responsibles/interfaces';

@Injectable()
export class LocationService {
	constructor(
		private locationRepository: LocationRepository,
		private companyRepository: CompanyRepository,
	) {}

	public async findById(id: string, currentUser: IUser): Promise<ILocation> {
		const location = await this.locationRepository.findById(id);

		if (!location) {
			throw new NotFoundException('Local não encontrado');
		}

		if (location.company.user.id !== currentUser.id) {
			throw new UnauthorizedException('Acesso negado');
		}

		return location;
	}

	public async findAllByCompany(
		page: number,
		companyId: string,
		currentUser: IUser,
	): Promise<IPaginationResponse<ILocation>> {
		const company = await this.companyRepository.findById(companyId);

		if (!company) throw new NotFoundException('Empresa não encontrada');
		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('Acesso negado');
		}

		return this.locationRepository.findAllByCompany(company, page, 15);
	}

	public async create(
		createLocation: ICreateLocation,
		currentUser: IUser,
	): Promise<ILocation> {
		const { address, name, companyId, responsibles } = createLocation;

		const company = await this.companyRepository.findById(companyId);
		if (!company) throw new NotFoundException('Empresa não encontrada');
		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('Acesso negado');
		}

		this.validateResponsibles(responsibles);
		return this.locationRepository.createLocation(
			{
				name,
				address,
				responsibles,
			},
			company,
		);
	}

	public async update(
		id: string,
		updateLocation: IUpdateLocation,
		currentUser: IUser,
	): Promise<ILocation> {
		const { name, address, responsibles } = updateLocation;

		const location = await this.locationRepository.findById(id);
		if (!location) {
			throw new NotFoundException('Local não encontrado');
		}
		if (location.company.user.id !== currentUser.id) {
			throw new UnauthorizedException('Acesso negado');
		}

		this.validateResponsibles(responsibles);
		const locationUpdated = await this.locationRepository.updateLocation(
			id,
			{
				name,
				address,
				responsibles,
			},
		);

		return locationUpdated;
	}

	private validateResponsibles(responsibles: IResponsible[]) {
		const mainResponsibles = responsibles.filter(
			(responsible) => responsible.isMainResponsible,
		);

		if (mainResponsibles.length === 0) {
			throw new BadRequestException('Deve ter no mínimo um responsável');
		}

		if (mainResponsibles.length > 1) {
			throw new BadRequestException(
				'Deve ter no mínimo um responsável principal',
			);
		}
	}

	public async delete(id: string, currentUser: IUser): Promise<ILocation> {
		const location = await this.locationRepository.findById(id);

		if (!location) {
			throw new NotFoundException('Local não encontrado');
		}

		if (location.company.user.id !== currentUser.id) {
			throw new UnauthorizedException('Acesso negado');
		}

		return this.locationRepository.deleteLocation(id);
	}
}
