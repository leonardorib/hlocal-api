import * as ORM from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DBCompany } from '../entities/company';
import { IPaginationResponse } from '../../shared/interfaces/pagination';
import { DBUser } from '../entities/user';

@ORM.EntityRepository(DBCompany)
@Injectable()
export class CompanyRepository extends ORM.Repository<DBCompany> {
	public async createCompany(
		model: ORM.DeepPartial<DBCompany>,
	): Promise<DBCompany> {
		const company = this.create(model);
		return this.save(company);
	}

	public async findById(id: string): Promise<DBCompany> {
		return this.findOne(id);
	}

	public async findAllByUser(
		user: DBUser,
		page: number,
		itemsPerPage: number,
	): Promise<IPaginationResponse<DBCompany>> {
		const count = await this.count({ where: { user } });
		const totalPages = Math.ceil(count / itemsPerPage);
		const companies = await this.find({
			where: { user },
			take: itemsPerPage,
			skip: page * itemsPerPage,
		});
		return {
			page,
			pageSize: itemsPerPage,
			totalPages,
			items: companies,
		};
	}

	public async updateCompany(
		id: string,
		model: ORM.DeepPartial<DBCompany>,
	): Promise<DBCompany> {
		const company = this.create({
			...model,
			id,
		});
		return this.save(company);
	}

	public async deleteCompany(id: string): Promise<DBCompany> {
		const company = await this.findOne(id);
		await this.delete(id);
		return company;
	}
}
