import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';
import { RoleInterface } from 'src/modules/roles/interfaces/role.interface';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.email, data.password);
  }

  @Public()
  @Post('make-token')
  makeToken(@Body() data: UserInterface & { currentRole: RoleInterface }) {
    return this.authService.makeToken(data);
  }
}
