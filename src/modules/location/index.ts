import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { DatabaseModule } from '../database';
import { AddressService } from '../shared/services/address.service';

@Module({
	imports: [DatabaseModule],
	controllers: [LocationController],
	providers: [AddressService, LocationService],
})
export class LocationModule {}
