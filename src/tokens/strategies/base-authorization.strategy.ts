import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthorizationResult } from './authorization.strategy';
import { AccessTokensService } from '../services/access-tokens.service';
import { RefreshTokensService } from '../services/refresh-tokens.service';

export abstract class BaseAuthorizationStrategy {
  @Inject(AccessTokensService)
  protected readonly accessTokensService: AccessTokensService;

  @Inject(RefreshTokensService)
  protected readonly refreshTokensService: RefreshTokensService;

  @Inject(ConfigService)
  protected readonly configService: ConfigService;

  protected authorizeUser(username: string): AuthorizationResult {
    const { accessToken, expiresAt } = this.accessTokensService.generateAccessToken({ usr: username });
    const { refreshToken } = this.refreshTokensService.generateRefreshToken({ usr: username });

    return Object.freeze({ refreshToken, accessToken, expiresAt, tokenType: 'Bearer' });
  }
}
