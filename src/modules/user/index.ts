import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { DatabaseModule } from '../database';

@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
