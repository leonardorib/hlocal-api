import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import 'dotenv/config';
import { ApplicationModule } from './modules/main';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.enableCors();
	const swaggerOptions = new DocumentBuilder()
		.setTitle('hublocal-api')
		.setDescription('Hublocal API')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, swaggerOptions);
	SwaggerModule.setup('/swagger', app, document);
	await app.listen(4000);
}
bootstrap();
