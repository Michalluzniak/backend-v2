import { AbstractTokensService } from './abstract-tokens.service';
import { RefreshTokensPersistence } from '../persistence/refresh-tokens.persistence';
export declare type RefreshToken = string;
export declare type RefreshTokenClaims = {
    usr: string;
    tid: string;
};
export declare class RefreshTokensService extends AbstractTokensService {
    protected readonly refreshTokensPersistence: RefreshTokensPersistence;
    generateRefreshToken(claims: Omit<RefreshTokenClaims, 'tid'>): {
        refreshToken: RefreshToken;
        expiresAt: Date;
    };
    validateRefreshToken(token: RefreshToken): boolean;
    decodeRefreshToken(token: RefreshToken): RefreshTokenClaims;
    invalidateRefreshToken(token: RefreshToken): void;
}
