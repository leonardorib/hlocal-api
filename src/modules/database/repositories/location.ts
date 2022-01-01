import * as ORM from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DBCompany } from '../entities/company';
import { IPaginationResponse } from '../../shared/interfaces/pagination';
import { DBLocation } from '../entities/location';

@ORM.EntityRepository(DBLocation)
@Injectable()
export class LocationRepository extends ORM.Repository<DBLocation> {
	public async createLocation(
		model: ORM.DeepPartial<DBLocation>,
		company: DBCompany,
	): Promise<DBLocation> {
		const location = this.create({ ...model, company });
		return this.save(location);
	}

	public async findById(id: string): Promise<DBLocation> {
		return this.findOne(id);
	}

	public async findAllByCompany(
		company: DBCompany,
		page: number,
		itemsPerPage: number,
	): Promise<IPaginationResponse<DBLocation>> {
		const count = await this.count({ where: { company } });
		const totalPages = Math.ceil(count / itemsPerPage);
		const locations = await this.find({
			where: { company },
			take: itemsPerPage,
			skip: page * itemsPerPage,
		});
		return {
			page,
			pageSize: itemsPerPage,
			totalPages,
			items: locations,
		};
	}

	public async updateLocation(
		id: string,
		model: ORM.DeepPartial<DBLocation>,
	): Promise<DBLocation> {
		const location = this.create({ ...model, id });
		return this.save(location);
	}

	public async deleteLocation(id: string): Promise<DBLocation> {
		const location = await this.findOne(id);
		await this.delete(id);
		return location;
	}
}
