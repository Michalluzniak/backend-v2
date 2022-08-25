import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export enum TokenRequestStrategy {
  refreshToken = 'refreshToken',
  userCredentials = 'userCredentials',
}

export class TokenRequest {
  @ApiProperty({ type: 'string', enum: Object.values(TokenRequestStrategy) })
  @IsIn(Object.values(TokenRequestStrategy))
  readonly strategy: TokenRequestStrategy;
}
