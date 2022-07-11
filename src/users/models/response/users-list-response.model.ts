import {
  Pagination,
  SuccessResponsePaginated,
} from '../../../common/types/response';
import { UserModel } from './user.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserPersistenceModel } from '../../users.persistence';

export class UsersListResponseModel extends SuccessResponsePaginated<
  UserModel[]
> {
  @ApiProperty({ type: UserModel, isArray: true })
  readonly data: UserModel[];

  @ApiProperty({ type: Pagination })
  readonly pagination: Pagination;

  constructor(users: UserPersistenceModel[], pagination: Pagination) {
    super(
      users.map(({ password, ...user }) => user),
      pagination,
    );
  }
}
