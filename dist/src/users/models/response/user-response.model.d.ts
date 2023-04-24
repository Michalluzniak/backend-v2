import { SuccessResponse } from '../../../common/types/response';
import { UserModel } from './user.model';
import { UserPersistenceModel } from '../../users.persistence';
export declare class UserResponseModel extends SuccessResponse<UserModel> {
    readonly data: UserModel;
    constructor({ password, ...user }: UserPersistenceModel);
}
