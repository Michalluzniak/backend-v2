import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  biography?: string;

  @ApiProperty()
  website?: string;

  @ApiProperty()
  birthday?: string;

  @ApiProperty({ format: 'datetime' })
  createdAt: Date;

  @ApiProperty({ format: 'datetime' })
  updatedAt: Date;
}
