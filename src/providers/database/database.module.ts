import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppDataSource } from '../../config/database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
})
export class DatabaseModule {}
