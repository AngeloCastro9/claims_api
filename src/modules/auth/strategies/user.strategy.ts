import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    async validate(req: any, email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(
            email,
            password,
        );

        return user;
    }
}
