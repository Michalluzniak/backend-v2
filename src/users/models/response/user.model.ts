import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: '+48 581 432 22 23$', required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  biography?: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty({ required: false })
  birthday?: string;

  @ApiProperty({ format: 'datetime' })
  createdAt: Date;

  @ApiProperty({ format: 'datetime' })
  updatedAt: Date;
}
