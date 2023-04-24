import { RefreshToken } from '../services/refresh-tokens.service';
import { AccessToken } from '../services/access-tokens.service';
export declare class AuthorizationResult {
    readonly refreshToken: RefreshToken;
    readonly accessToken: AccessToken;
    readonly tokenType: 'Bearer';
    readonly expiresAt: Date;
}
export interface AuthorizationService {
    authorize(credentials: string): Promise<AuthorizationResult>;
}
