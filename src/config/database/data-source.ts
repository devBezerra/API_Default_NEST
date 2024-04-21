import * as path from 'path';
require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { MainSeeder } from './main-seeder';

import { entities } from './database-entities';
import { SeederOptions } from 'typeorm-extension';

export const typeormOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities,
  migrations: [
    path.join(__dirname, '../../config/database/migrations/*{.ts,.js}'),
  ],
  synchronize: false,
  logging: false,
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(typeormOptions);