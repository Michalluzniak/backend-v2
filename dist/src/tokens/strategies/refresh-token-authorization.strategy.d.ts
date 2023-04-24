import { AuthorizationResult, AuthorizationService } from './authorization.strategy';
import { BaseAuthorizationStrategy } from './base-authorization.strategy';
export declare class RefreshTokenAuthorizationStrategy extends BaseAuthorizationStrategy implements AuthorizationService {
    authorize(credentials: string): Promise<AuthorizationResult>;
}
