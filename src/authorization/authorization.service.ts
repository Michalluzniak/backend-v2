import { Token } from '../tokens/services/tokens.service';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationResult {
  @ApiProperty({ type: 'string', format: 'jwt' })
  readonly accessToken: Token;
  @ApiProperty({ type: 'string', enum: ['Bearer'] })
  readonly tokenType: 'Bearer';
  @ApiProperty({ type: 'string', format: 'date-time' })
  readonly expiresAt: Date;
}

export interface AuthorizationService {
  authorize(credentials: string): Promise<AuthorizationResult>;
}
