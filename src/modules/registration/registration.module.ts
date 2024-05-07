import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { RegistrationEntity } from './entities/registration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationEntity])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
