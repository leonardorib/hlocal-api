import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user';
import { CompanyRepository } from './repositories/company';
import { LocationRepository } from './repositories/location';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserRepository,
			CompanyRepository,
			LocationRepository,
		]),
	],
	exports: [
		TypeOrmModule.forFeature([
			UserRepository,
			CompanyRepository,
			LocationRepository,
		]),
	],
	providers: [],
})
export class DatabaseModule {}
