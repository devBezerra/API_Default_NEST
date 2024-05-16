import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationEntity } from 'src/modules/registration/entities/registration.entity';
import { RegistrationInterface } from 'src/modules/registration/interfaces/registration.interface';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';
import { CheckRole } from 'src/shared/utils/check-role.util';
import { Repository } from 'typeorm';

@Injectable()
export class YourRegistrationGuard implements CanActivate {
  constructor(
    @InjectRepository(RegistrationEntity)
    private readonly registrationRepository: Repository<RegistrationEntity>,

    private checkRole: CheckRole,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const currentUser: UserInterface = context.switchToHttp().getRequest().user;
    const id: number = context.switchToHttp().getRequest().params.id;
    const register: RegistrationInterface = await this.registrationRepository.findOne({ where: { id } });
    
    if(!this.checkRole.isAdmin(currentUser) && currentUser.id !== (register && register.userId)) {
      throw new UnauthorizedException({ message: 'Você não possue autorização para realizar essa ação.' });
    }
    return true;
  }
}
