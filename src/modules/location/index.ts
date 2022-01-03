import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { DatabaseModule } from '../database';

@Module({
	imports: [DatabaseModule],
	controllers: [LocationController],
	providers: [LocationService],
})
export class LocationModule {}
