/// <reference types="node" />
import { AuthorizationResult } from './strategies/authorization.strategy';
import { IncomingMessage } from 'http';
import { TokenRequest } from './token.request';
export declare class TokenController {
    private readonly userCredentialsAuthorizationService;
    private readonly refreshTokenAuthorizationService;
    authorize(request: IncomingMessage, query: TokenRequest): Promise<AuthorizationResult>;
}
