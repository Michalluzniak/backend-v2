import { AbstractTokensService } from './abstract-tokens.service';
export declare type AccessToken = string;
export declare type AccessTokenClaims = {
    usr: string;
};
export declare class AccessTokensService extends AbstractTokensService {
    generateAccessToken(claims: AccessTokenClaims): {
        accessToken: AccessToken;
        expiresAt: Date;
    };
    validateAccessToken(token: AccessToken): boolean;
}
