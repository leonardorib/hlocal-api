import { Module, Controller, Get } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user';
import { AuthModule } from './auth';
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
		RouterModule.register([{ path: '/user', module: UserModule }]),
		UserModule,
	],
	controllers: [RootController],
})
export class ApplicationModule {}
