import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ICompany } from '../interfaces';
import { IUser } from '../../user/interfaces';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';

import { CompanyRepository } from '../../database/repositories/company';
import { UserRepository } from '../../database/repositories/user';
import { IPaginationResponse } from 'modules/shared/interfaces/pagination';
import { IResponsible } from '../../responsibles/interfaces';

@Injectable()
export class CompanyService {
	constructor(
		private companyRepository: CompanyRepository,
		private userRepository: UserRepository,
	) {}

	public async findById(id: string, currentUser: IUser): Promise<ICompany> {
		const company = await this.companyRepository.findById(id);

		if (!company) {
			throw new NotFoundException('company-not-found');
		}

		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		return company;
	}

	public async findAllByCurrentUser(
		page: number,
		currentUser: IUser,
	): Promise<IPaginationResponse<ICompany>> {
		const user = await this.userRepository.findById(currentUser.id);

		return this.companyRepository.findAllByUser(user, page, 15);
	}

	private validateAndTransformCnpj(cnpj: string) {
		const isCnpjValid = cnpjValidator.isValid(cnpj);

		if (!isCnpjValid) {
			throw new BadRequestException('Invalid cnpj');
		}

		return cnpjValidator.strip(cnpj);
	}

	private async isCnpjInUse(cnpj: string) {
		const existingCompany = await this.companyRepository.findOne({ cnpj });
		return !!existingCompany;
	}

	private validateResponsibles(responsibles: IResponsible[]) {
		const mainResponsibles = responsibles.filter(
			(responsible) => responsible.isMainResponsible,
		);

		if (mainResponsibles.length === 0) {
			throw new BadRequestException('Must have one main responsible');
		}

		if (mainResponsibles.length > 1) {
			throw new BadRequestException(
				'Must have only one main responsible',
			);
		}
	}

	public async create(
		model: Omit<ICompany, 'id'>,
		currentUser: IUser,
	): Promise<ICompany> {
		const { cnpj } = model;

		const cnpjNumber = this.validateAndTransformCnpj(cnpj);

		this.validateResponsibles(model.responsibles);

		return this.companyRepository.createCompany({
			...model,
			user: currentUser,
			cnpj: cnpjNumber,
		});
	}

	public async update(
		id: string,
		model: Omit<ICompany, 'id'>,
		currentUser: IUser,
	): Promise<ICompany> {
		const company = await this.companyRepository.findById(id);

		if (!company) {
			throw new NotFoundException('company-not-found');
		}

		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		const { cnpj } = model;

		const cnpjNumber = this.validateAndTransformCnpj(cnpj);

		if (company.cnpj !== cnpjNumber) {
			if (await this.isCnpjInUse(cnpjNumber)) {
				throw new BadRequestException('cnpj already in use');
			}
		}

		this.validateResponsibles(model.responsibles);

		const companyUpdated = await this.companyRepository.updateCompany(id, {
			...company,
			...model,
			cnpj: cnpjNumber,
		});
		return companyUpdated;
	}

	public async delete(id: string, currentUser: IUser): Promise<ICompany> {
		const company = await this.companyRepository.findById(id);

		if (!company) {
			throw new NotFoundException('company-not-found');
		}

		if (company.user.id !== currentUser.id) {
			throw new UnauthorizedException('access-denied');
		}

		return this.companyRepository.deleteCompany(id);
	}
}
