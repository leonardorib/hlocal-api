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
import { classToClass } from 'class-transformer';
import { UserRepository } from '../../database/repositories/user';
import { IPaginationResponse } from 'modules/shared/interfaces/pagination';

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

		return this.companyRepository.findAllByUser(user, page, 20);
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

	public async create(
		model: Omit<ICompany, 'id'>,
		currentUser: IUser,
	): Promise<ICompany> {
		const { cnpj } = model;

		const cnpjNumber = this.validateAndTransformCnpj(cnpj);

		if (await this.isCnpjInUse(cnpjNumber)) {
			throw new BadRequestException('cnpj already in use');
		}

		const company = await this.companyRepository.createCompany({
			...model,
			user: currentUser,
			cnpj: cnpjNumber,
		});

		return classToClass(company);
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
