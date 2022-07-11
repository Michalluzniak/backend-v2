import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserByIdRequestModel {
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;
}
