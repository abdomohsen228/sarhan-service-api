import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Admin } from '../admin/entities/admin.entity';
import { Category } from '../product/entities/category.entity';
import { Product } from '../product/entities/product.entity';
import { WebsiteSettings } from '../admin/metaData/website-settings.entity';
const globalEnvs = dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
}).parsed;
const configurations = {
  port: parseInt(globalEnvs.PORT, 10) || 3000,
  database: {
    host: globalEnvs.DATABASE_HOST,
    port: parseInt(globalEnvs.DATABASE_PORT, 10) || 5432,
    username: globalEnvs.DATABASE_USERNAME,
    password: globalEnvs.DATABASE_PASSWORD,
  },
};
export const typeORMConfigurations: TypeOrmModuleOptions = {
  type: 'postgres',
  host: globalEnvs.DATABASE_HOST,
  port: parseInt(globalEnvs.DATABASE_PORT),
  username: globalEnvs.DATABASE_USERNAME,
  password: globalEnvs.DATABASE_PASSWORD,
  database: globalEnvs.DATABASE_NAME,
  entities: [Admin, Category, Product, WebsiteSettings],
  synchronize: false,
};
export default () => configurations;
