const rootDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
module.exports = {
	name: 'default',
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	logging: process.env.POSTGRES_HOST !== 'postgres' ? 'all' : 'error',
	entities: [rootDir + '/modules/database/entities/**/*.{js,ts}'],
	migrations: [rootDir + '/modules/database/migrations/**/*.{js,ts}'],
	cli: {
		migrationsDir: rootDir + '/modules/database/migrations',
		entitiesDir: rootDir + '/modules/database/entities',
	},
};
