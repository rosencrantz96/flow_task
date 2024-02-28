import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
