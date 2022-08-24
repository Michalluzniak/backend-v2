import * as JWT from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Inject, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

export type Token = string;
export type TokenClaims = any;

export const ITokenService = Symbol('ITokenService');

export class TokensService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  generateAccessToken(claims: TokenClaims): { accessToken: Token; expiresAt: Date } {
    const privateKey = this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_PRIVATE_KEY');

    if (!privateKey) {
      throw new InternalServerErrorException('JWT_ACCESS_TOKEN_PRIVATE_KEY variable needs to be configured!');
    }

    const algorithm = this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_ALGORITHM') || 'ES512';
    const issuedAt = Math.floor(new Date().getTime() / 1000);
    const expiresIn = +this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') || 60 * 60;
    const accessToken = JWT.sign({ ...claims, iat: issuedAt }, privateKey, { expiresIn, algorithm });

    return { accessToken, expiresAt: new Date((issuedAt + expiresIn) * 1000) };
  }

  verifyAccessToken(token: Token): TokenClaims | null {
    const publicKey = this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_PUBLIC_KEY');

    if (!publicKey) {
      throw new InternalServerErrorException('JWT_ACCESS_TOKEN_PUBLIC_KEY variable needs to be configured!');
    }

    try {
      return JWT.verify(token, publicKey, {
        algorithms: [this.configService.get<JWT.Algorithm>('JWT_ACCESS_TOKEN_ALGORITHM') || 'ES512'],
      }) as TokenClaims;
    } catch (e) {
      throw new UnauthorizedException('Wrong authorization credentials');
    }
  }
}
