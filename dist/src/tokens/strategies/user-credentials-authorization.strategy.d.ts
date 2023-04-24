import { AuthorizationResult, AuthorizationService } from './authorization.strategy';
import { BaseAuthorizationStrategy } from './base-authorization.strategy';
export declare class UserCredentialsAuthorizationStrategy extends BaseAuthorizationStrategy implements AuthorizationService {
    authorize(credentials: string): Promise<AuthorizationResult>;
}
