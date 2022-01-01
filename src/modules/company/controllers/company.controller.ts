import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UseGuards,
	Query,
	Delete,
} from '@nestjs/common';
import {
	ApiResponse,
	ApiTags,
	ApiBearerAuth,
	ApiOperation,
} from '@nestjs/swagger';
import { DBCompany } from '../../database/entities/company';
import { JwtAuthGuard, CurrentUser } from '../../auth/guards/jwt-auth.guard';

import { CompanyService } from '../services/company.service';
import { CreateOrUpdateCompanyValidator } from '../validators/createOrUpdate';
import { IUser } from '../../user/interfaces';
import { IPaginationRequestQuery } from '../../shared/validators/paginationRequest';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get(':companyId')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 200, type: DBCompany })
	@ApiBearerAuth()
	public async details(
		@Param('companyId', ParseUUIDPipe) companyId: string,
		@CurrentUser() currentUser: IUser,
	) {
		return this.companyService.findById(companyId, currentUser);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary:
			'Only shows companies created by the current user. Page starts at 0',
	})
	@ApiResponse({ status: 200, type: DBCompany })
	@ApiBearerAuth()
	public async list(
		@CurrentUser() currentUser: IUser,
		@Query()
		query: IPaginationRequestQuery,
	) {
		return this.companyService.findAllByCurrentUser(
			query.page,
			currentUser,
		);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBCompany })
	@ApiBearerAuth()
	public async create(
		@Body() model: CreateOrUpdateCompanyValidator,
		@CurrentUser() currentUser: IUser,
	) {
		return this.companyService.create(model, currentUser);
	}

	@Put(':companyId')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBCompany })
	public async update(
		@Param('companyId', ParseUUIDPipe) companyId: string,
		@Body() model: CreateOrUpdateCompanyValidator,
		@CurrentUser() currentUser: IUser,
	) {
		return this.companyService.update(companyId, model, currentUser);
	}

	@Delete(':companyId')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBCompany })
	public async delete(
		@Param('companyId', ParseUUIDPipe) companyId: string,
		@CurrentUser() currentUser: IUser,
	) {
		return this.companyService.delete(companyId, currentUser);
	}
}
