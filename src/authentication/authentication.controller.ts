import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';
import { UserInterface } from 'src/modules/users/interfaces/user.interface';
import { AuthUserInterface } from './interfaces/auth-user.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @Post('login')
  async signIn(@Body() data: SignInDto): Promise<AuthUserInterface> {
    return await this.authService.signIn(data.email, data.password);
  }

  @Public()
  @Post('make-token')
  makeToken(@Body() data: UserInterface): { access_token: string } {
    return this.authService.makeToken(data);
  }
}
