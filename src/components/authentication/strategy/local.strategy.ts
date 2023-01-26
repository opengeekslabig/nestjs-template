import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { UserEntities } from '@components/users/entities/user.entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'login',
    });
  }
  async validate(email: string, password: string): Promise<UserEntities> {
    console.log(email);
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
