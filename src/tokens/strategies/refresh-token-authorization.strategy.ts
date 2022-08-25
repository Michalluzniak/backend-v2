import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizationResult, AuthorizationService } from './authorization.strategy';
import { BaseAuthorizationStrategy } from './base-authorization.strategy';
import { RefreshToken } from '../services/refresh-tokens.service';

@Injectable()
export class RefreshTokenAuthorizationStrategy extends BaseAuthorizationStrategy implements AuthorizationService {
  async authorize(credentials: string): Promise<AuthorizationResult> {
    const token = credentials as RefreshToken;

    if (!this.refreshTokensService.validateRefreshToken(token)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { usr: username } = this.refreshTokensService.decodeRefreshToken(token);

    this.refreshTokensService.invalidateRefreshToken(token);

    return this.authorizeUser(username);
  }
}
