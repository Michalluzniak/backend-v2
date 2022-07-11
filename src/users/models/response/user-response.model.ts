import { SuccessResponse } from '../../../common/types/response';
import { UserModel } from './user.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserPersistenceModel } from '../../users.persistence';

export class UserResponseModel extends SuccessResponse<UserModel> {
  @ApiProperty({ type: UserModel, isArray: true })
  readonly data: UserModel;

  constructor({ password, ...user }: UserPersistenceModel) {
    super(user);
  }
}
