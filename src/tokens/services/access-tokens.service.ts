import * as JWT from 'jsonwebtoken';
import { InternalServerErrorException } from '@nestjs/common';
import { AbstractTokensService } from './abstract-tokens.service';

export type AccessToken = string;
export type AccessTokenClaims = { usr: string };

export class AccessTokensService extends AbstractTokensService {
  generateAccessToken(claims: AccessTokenClaims): { accessToken: AccessToken; expiresAt: Date } {
    const privateKey = this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_PRIVATE_KEY');

    if (!privateKey) {
      throw new InternalServerErrorException('JWT_ACCESS_TOKEN_PRIVATE_KEY variable needs to be configured!');
    }

    const algorithm = this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_ALGORITHM') || 'ES512';
    const expiresIn = +this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') || 60 * 60;
    const { token: accessToken, expiresAt } = AbstractTokensService._generateJWT(claims, {
      algorithm,
      expiresIn,
      privateKey,
    });

    return { accessToken, expiresAt };
  }

  validateAccessToken(token: AccessToken): boolean {
    const publicKey = this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!publicKey) {
      throw new InternalServerErrorException('JWT_ACCESS_TOKEN_PUBLIC_KEY variable needs to be configured!');
    }

    try {
      return !!JWT.verify(token, publicKey, {
        algorithms: [this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_ALGORITHM') || 'ES512'],
      });
    } catch (e) {
      return false;
    }
  }
}
