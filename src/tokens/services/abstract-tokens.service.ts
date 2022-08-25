import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';

export abstract class AbstractTokensService {
  @Inject(ConfigService)
  protected readonly configService: ConfigService;

  protected static _generateJWT(
    claims: object,
    options: { expiresIn: number; algorithm: JWT.Algorithm; privateKey: string },
  ): { token: string; expiresAt: Date } {
    const { expiresIn, privateKey, algorithm } = options;
    const issuedAt = Math.floor(new Date().getTime() / 1000);
    const expiresAt = new Date((issuedAt + expiresIn) * 1000);
    const token = JWT.sign({ ...claims, iat: issuedAt }, privateKey, { expiresIn, algorithm });

    return { expiresAt, token };
  }
}
