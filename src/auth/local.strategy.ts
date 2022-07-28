import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { jwtConstants } from './auth.constant';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(phone: string, password: string) {
    if (password.length === 4) {
      const user = this.authService.validateUser(phone, password);
      if (!user) throw new UnauthorizedException('Accsess Denied');
      return user;
    } else {
      throw new UnauthorizedException('otp has 4 digits');
    }
  }
}
