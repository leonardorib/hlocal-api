import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseModule } from '../database';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_SETTINGS } from '../../config';

@Module({
	imports: [
		DatabaseModule,
		PassportModule,
		JwtModule.register({
			secret: JWT_SETTINGS.secret,
			signOptions: { expiresIn: JWT_SETTINGS.expiresIn },
		}),
	],
	controllers: [AuthController],
	exports: [AuthService],
	providers: [LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
