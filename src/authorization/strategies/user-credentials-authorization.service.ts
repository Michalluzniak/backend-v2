import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ITokenService, TokensService } from '../../tokens/services/tokens.service';
import { ConfigService } from '@nestjs/config';
import { AuthorizationResult, AuthorizationService } from '../authorization.service';

@Injectable()
export class UserCredentialsAuthorizationService implements AuthorizationService {
  constructor(
    @Inject(ITokenService)
    private readonly accessTokenService: TokensService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  async authorize(credentials: string): Promise<AuthorizationResult> {
    let base64DecodedCredentials;

    try {
      base64DecodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials format. Use basic authorization value.');
    }

    const validUsername = this.configService.get<string>('ADMIN_USERNAME') || 'admin';
    const validPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'password';
    const username = base64DecodedCredentials.split(':')[0];
    const password = base64DecodedCredentials.substring(username.length + 1);
    const { accessToken, expiresAt } = this.accessTokenService.generateAccessToken({ usr: username });

    if (username !== validUsername || password !== validPassword) {
      throw new UnauthorizedException('Invalid credentials format. Use basic authorization value.');
    }

    return Object.freeze({ accessToken, expiresAt, tokenType: 'Bearer' });
  }
}
