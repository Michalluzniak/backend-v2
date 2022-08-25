import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizationResult, AuthorizationService } from './authorization.strategy';
import { BaseAuthorizationStrategy } from './base-authorization.strategy';

@Injectable()
export class UserCredentialsAuthorizationStrategy extends BaseAuthorizationStrategy implements AuthorizationService {
  async authorize(credentials: string): Promise<AuthorizationResult> {
    let base64DecodedCredentials;

    try {
      base64DecodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials format. Use basic authorization value.');
    }

    const validUsername = this.configService.get<string>('ADMIN_USERNAME') || 'admin';
    const validPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'password';
    const username = base64DecodedCredentials.split(':')[0];
    const password = base64DecodedCredentials.substring(username.length + 1);

    if (username !== validUsername || password !== validPassword) {
      throw new UnauthorizedException('Invalid credentials format. Use basic authorization value.');
    }

    return this.authorizeUser(username);
  }
}
