import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';
import { CheckRole } from 'src/shared/utils/check-role.util';

@Injectable()
export class AdminOrUserGuard implements CanActivate {
  constructor(private checkRole: CheckRole) {}

  canActivate(context: ExecutionContext): boolean {
    const currentUser: UserInterface = context.switchToHttp().getRequest().user;
    const id: number = context.switchToHttp().getRequest().params.id;
    const userId: number = context.switchToHttp().getRequest().body.userId;
    console.log(currentUser.id)
    if (!this.checkRole.isAdmin(currentUser) && currentUser.id !== +id && currentUser.id !== +userId) {
      throw new UnauthorizedException({ message: 'Você não possue autorização para realizar essa ação.' });
    }
    return true;
  }
}
