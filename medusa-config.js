const dotenv = require('dotenv');

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'prod':
		ENV_FILE_NAME = '.env';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	default:
		ENV_FILE_NAME = '.env';
		break;
}

dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const PORT = process.env.PORT || 3000;
const ADMIN_CORS = process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001';
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:8000';

const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`,
	{
    resolve: `medusa-file-minio`,
    options: {
        endpoint: process.env.MINIO_SERVER,
        bucket: process.env.MINIO_BUCKET,
        access_key_id: process.env.MINIO_ACCESS_KEY,
        secret_access_key: process.env.MINIO_SECRET_KEY,
    },
	},
];

module.exports = {
	serverConfig: {
		port: PORT,
	},
	projectConfig: {
		// For more production-like environment install PostgresQL
		jwtSecret: process.env.JWT_SECRET,
		cookieSecret: process.env.COOKIE_SECRET,

		database_url: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEME}`,
		database_type: 'postgres',
		store_cors: STORE_CORS,
		admin_cors: ADMIN_CORS,
		redis_url: REDIS_URL,
		cli_migration_dirs: [
			'dist/**/*.migration.js'
		]
	},
	plugins,
};
