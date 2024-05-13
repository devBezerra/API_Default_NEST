import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEmailAlreadyExists } from './validate/user-email-already-exists.constraint';
import { CheckRole } from 'src/shared/utils/check-role.util';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserEntity, UserEmailAlreadyExists, CheckRole],
  exports: [UsersService]
})
export class UsersModule {}
