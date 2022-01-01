import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user';
import { CompanyRepository } from './repositories/company';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository, CompanyRepository])],
	exports: [TypeOrmModule.forFeature([UserRepository, CompanyRepository])],
	providers: [],
})
export class DatabaseModule {}
