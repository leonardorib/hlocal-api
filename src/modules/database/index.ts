import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	exports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [],
})
export class DatabaseModule {}
