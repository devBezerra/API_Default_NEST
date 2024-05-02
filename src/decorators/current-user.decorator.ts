import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator((data: keyof UserEntity, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();
  return user;
});
