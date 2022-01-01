import { Module, Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user';
import { AuthModule } from './auth';
import { CompanyModule } from './company';
import { LocationModule } from './location';
import { DBUser } from './database/entities/user';

@Controller()
class RootController {
	@Get('/')
	public async rootGet() {
		return 'HubLocal API running!';
	}
}

@Module({
	imports: [
		TypeOrmModule.forRoot({
			entities: [DBUser],
		}),
		AuthModule,
		UserModule,
		CompanyModule,
		LocationModule,
	],
	controllers: [RootController],
})
export class ApplicationModule {}
