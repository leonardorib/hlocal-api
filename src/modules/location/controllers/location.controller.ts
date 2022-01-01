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

import { LocationService } from '../services/location.service';
import { CreateOrUpdateValidator } from '../validators/createOrUpdate';
import { IUser } from '../../user/interfaces';
import { IPaginationRequestQuery } from '../../shared/validators/paginationRequest';
import { DBLocation } from '../../database/entities/location';

@ApiTags('Company Locations')
@Controller('companies')
export class LocationController {
	constructor(private locationService: LocationService) {}

	@Get('locations/:locationId')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 200, type: DBLocation })
	@ApiBearerAuth()
	public async getById(
		@Param('locationId', ParseUUIDPipe) locationId: string,
		@CurrentUser() currentUser: IUser,
	) {
		return this.locationService.findById(locationId, currentUser);
	}

	@Get(':companyId/locations')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: 'Page starts at 0',
	})
	@ApiResponse({ status: 200, type: [DBLocation] })
	@ApiBearerAuth()
	public async list(
		@CurrentUser() currentUser: IUser,
		@Param('companyId', ParseUUIDPipe) companyId: string,
		@Query()
		query: IPaginationRequestQuery,
	) {
		return this.locationService.findAllByCompany(
			query.page,
			companyId,
			currentUser,
		);
	}

	@Post(':companyId/locations')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBCompany })
	@ApiBearerAuth()
	public async create(
		@Param('companyId', ParseUUIDPipe) companyId: string,
		@Body() model: CreateOrUpdateValidator,
		@CurrentUser() currentUser: IUser,
	) {
		return this.locationService.create(
			{ ...model, companyId },
			currentUser,
		);
	}

	@Put('locations/:locationId')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBCompany })
	public async update(
		@Param('locationId', ParseUUIDPipe) locationId: string,
		@Body() model: CreateOrUpdateValidator,
		@CurrentUser() currentUser: IUser,
	) {
		return this.locationService.update(locationId, model, currentUser);
	}

	@Delete('locations/:locationId')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 200, type: DBCompany })
	public async delete(
		@Param('locationId', ParseUUIDPipe) locationId: string,
		@CurrentUser() currentUser: IUser,
	) {
		return this.locationService.delete(locationId, currentUser);
	}
}
