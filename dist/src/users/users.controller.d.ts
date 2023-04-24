import { CreateUserRequestModel } from './models/requests/create-user-request.model';
import { FindUserByIdRequestModel } from './models/requests/find-user-by-id-request.model';
import { UpdateUserRequestModel } from './models/requests/update-user-request.model';
import { FindUsersRequestModel } from './models/requests/find-users-request.model';
import { UsersListResponseModel } from './models/response/users-list-response.model';
import { UserResponseModel } from './models/response/user-response.model';
export declare class UsersController {
    private readonly usersPersistence;
    getUsersList(query: FindUsersRequestModel): Promise<UsersListResponseModel>;
    getUserById(params: FindUserByIdRequestModel): Promise<UserResponseModel>;
    createUser(model: CreateUserRequestModel): Promise<UserResponseModel>;
    updateUser(params: FindUserByIdRequestModel, model: UpdateUserRequestModel): Promise<UserResponseModel>;
    removeUser(params: FindUserByIdRequestModel): Promise<void>;
}
