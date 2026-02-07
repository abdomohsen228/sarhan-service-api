import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = path.resolve(process.cwd(), `.env.${nodeEnv}`);
const result = dotenv.config({ path: envFile });
const getEnv = (
  key: string,
  required: boolean = true,
  defaultValue: string = '',
): string => {
  if (
    process.env[key] &&
    process.env[key] !== key &&
    !process.env[key]?.includes(` ${key}`)
  ) {
    return process.env[key];
  }

  const parsedValue = result.parsed?.[key];
  if (
    parsedValue &&
    parsedValue !== key &&
    !parsedValue.includes(` ${key}`) &&
    parsedValue.trim() !== ''
  ) {
    return parsedValue;
  }
  if (required && !defaultValue) {
    throw new Error(`Required environment variable ${key} is not set`);
  }

  return defaultValue;
};

export default new DataSource({
  type: 'postgres',
  host: getEnv('DATABASE_HOST', true),
  port: parseInt(getEnv('DATABASE_PORT', true), 10),
  username: getEnv('DATABASE_USERNAME', true),
  password: getEnv('DATABASE_PASSWORD', true),
  database: getEnv('DATABASE_NAME', true),
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
