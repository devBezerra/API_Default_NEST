import { Module } from '@nestjs/common';
import { CoursesModule } from '../modules/courses/courses.module';
import { ConfigProvidersModule } from 'src/providers/enviroment/enviroment.module';
import { DatabaseModule } from 'src/providers/database/database.module';

@Module({
  imports: [ConfigProvidersModule, DatabaseModule, CoursesModule],
})
export class AppModule {}
