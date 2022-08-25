import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from '../services/refresh-tokens.service';
import { AccessToken } from '../services/access-tokens.service';

export class AuthorizationResult {
  @ApiProperty({ type: 'string', format: 'jwt' })
  readonly refreshToken: RefreshToken;
  @ApiProperty({ type: 'string', format: 'jwt' })
  readonly accessToken: AccessToken;
  @ApiProperty({ type: 'string', enum: ['Bearer'] })
  readonly tokenType: 'Bearer';
  @ApiProperty({ type: 'string', format: 'date-time' })
  readonly expiresAt: Date;
}

export interface AuthorizationService {
  authorize(credentials: string): Promise<AuthorizationResult>;
}
