import 'dotenv/config';

export const NODE_ENV = (process.env.NODE_ENV || 'production').trim();

export const IS_DEV = NODE_ENV !== 'production' && NODE_ENV !== 'test';
export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';

const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SETTINGS = {
	secret: JWT_SECRET,
	expiresIn: '7d',
};
