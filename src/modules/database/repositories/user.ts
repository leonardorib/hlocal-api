import * as ORM from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DBUser } from '../entities/user';

@ORM.EntityRepository(DBUser)
@Injectable()
export class UserRepository extends ORM.Repository<DBUser> {
	public async createUser(model: ORM.DeepPartial<DBUser>): Promise<DBUser> {
		const user = this.create(model);
		return this.save(user);
	}

	public async findById(id: string): Promise<DBUser> {
		return this.findOne(id);
	}

	public async findByEmail(email: string): Promise<DBUser> {
		return this.findOne({ email });
	}

	public async isEmailAvailable(email: string): Promise<boolean> {
		const user = await this.findOne({ email });
		return !user;
	}

	public async updateUser(
		id: string,
		model: ORM.DeepPartial<DBUser>,
	): Promise<DBUser> {
		const user = this.create({ ...model, id });
		return this.save(user);
	}

	public async deleteUser(id: string): Promise<DBUser> {
		const user = await this.findOne(id);
		await this.delete(id);
		return user;
	}
}
