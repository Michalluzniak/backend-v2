import { Pagination, SuccessResponsePaginated } from '../../../common/types/response';
import { UserModel } from './user.model';
import { UserPersistenceModel } from '../../users.persistence';
export declare class UsersListResponseModel extends SuccessResponsePaginated<UserModel[]> {
    readonly data: UserModel[];
    readonly pagination: Pagination;
    constructor(users: UserPersistenceModel[], pagination: Pagination);
}
