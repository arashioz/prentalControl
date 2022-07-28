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
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrPrivateKey: '1',
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
