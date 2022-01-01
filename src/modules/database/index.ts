import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user';
import { CompanyRepository } from './repositories/company';
import { LocationRepository } from './repositories/location';
import { DBResponsible } from './entities/responsible';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserRepository,
			CompanyRepository,
			LocationRepository,
			DBResponsible,
		]),
	],
	exports: [
		TypeOrmModule.forFeature([
			UserRepository,
			CompanyRepository,
			LocationRepository,
			DBResponsible,
		]),
	],
	providers: [],
})
export class DatabaseModule {}
