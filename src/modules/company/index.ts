import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { DatabaseModule } from '../database';

@Module({
	imports: [DatabaseModule],
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
