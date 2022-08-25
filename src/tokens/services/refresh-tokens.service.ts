import * as JWT from 'jsonwebtoken';
import { AbstractTokensService } from './abstract-tokens.service';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RefreshTokensPersistence } from '../persistence/refresh-tokens.persistence';
import { UUID } from '../../common/types/uuid';

export type RefreshToken = string;
export type RefreshTokenClaims = { usr: string; tid: string };

export class RefreshTokensService extends AbstractTokensService {
  @Inject(RefreshTokensPersistence)
  protected readonly refreshTokensPersistence: RefreshTokensPersistence;

  generateRefreshToken(claims: Omit<RefreshTokenClaims, 'tid'>): { refreshToken: RefreshToken; expiresAt: Date } {
    const finalClaims = { ...claims, tid: new UUID().toString() };
    const privateKey = this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_PRIVATE_KEY');

    if (!privateKey) {
      throw new InternalServerErrorException('JWT_REFRESH_TOKEN_PRIVATE_KEY variable needs to be configured!');
    }

    const algorithm = this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512';
    const expiresIn = +this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') || 24 * 60 * 60;
    const { token: refreshToken, expiresAt } = AbstractTokensService._generateJWT(finalClaims, {
      algorithm,
      expiresIn,
      privateKey,
    });

    this.refreshTokensPersistence.create(finalClaims.tid);

    return { refreshToken, expiresAt };
  }

  validateRefreshToken(token: RefreshToken): boolean {
    const publicKey = this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_PUBLIC_KEY');

    if (!publicKey) {
      throw new InternalServerErrorException('JWT_REFRESH_TOKEN_PUBLIC_KEY variable needs to be configured!');
    }

    try {
      const { tid } = JWT.verify(token, publicKey, {
        algorithms: [this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512'],
      }) as RefreshTokenClaims;

      return this.refreshTokensPersistence.exists(tid);
    } catch (e) {
      return false;
    }
  }

  decodeRefreshToken(token: RefreshToken): RefreshTokenClaims {
    const publicKey = this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_PUBLIC_KEY');

    if (!publicKey) {
      throw new InternalServerErrorException('JWT_REFRESH_TOKEN_PUBLIC_KEY variable needs to be configured!');
    }

    return JWT.verify(token, publicKey, {
      algorithms: [this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512'],
    }) as RefreshTokenClaims;
  }

  invalidateRefreshToken(token: RefreshToken): void {
    const publicKey = this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_PUBLIC_KEY');

    if (!publicKey) {
      throw new InternalServerErrorException('JWT_REFRESH_TOKEN_PUBLIC_KEY variable needs to be configured!');
    }

    const { tid } = JWT.verify(token, publicKey, {
      algorithms: [this.configService.get<JWT.Algorithm>('JWT_REFRESH_TOKEN_ALGORITHM') || 'ES512'],
    }) as RefreshTokenClaims;

    return this.refreshTokensPersistence.destroy(tid);
  }
}
