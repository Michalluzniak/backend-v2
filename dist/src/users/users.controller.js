"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_persistence_1 = require("./users.persistence");
const create_user_request_model_1 = require("./models/requests/create-user-request.model");
const response_1 = require("../common/types/response");
const find_user_by_id_request_model_1 = require("./models/requests/find-user-by-id-request.model");
const update_user_request_model_1 = require("./models/requests/update-user-request.model");
const find_users_request_model_1 = require("./models/requests/find-users-request.model");
const users_list_response_model_1 = require("./models/response/users-list-response.model");
const swagger_1 = require("@nestjs/swagger");
const user_response_model_1 = require("./models/response/user-response.model");
const access_token_guard_1 = require("../tokens/guards/access-token.guard");
let UsersController = class UsersController {
    async getUsersList(query) {
        const findOptions = Object.assign({ search: query.search }, response_1.Pagination.calculateOffset(query));
        const results = await this.usersPersistence.find(findOptions);
        const pagination = response_1.Pagination.ofTotalResults(Object.assign({ totalResults: results.total }, query));
        return new users_list_response_model_1.UsersListResponseModel(results.rows, pagination);
    }
    async getUserById(params) {
        const user = await this.usersPersistence.findById(params.id);
        return new user_response_model_1.UserResponseModel(user);
    }
    async createUser(model) {
        const user = await this.usersPersistence.save(model);
        return new user_response_model_1.UserResponseModel(user);
    }
    async updateUser(params, model) {
        const user = await this.usersPersistence.findById(params.id);
        const updatedUser = Object.assign(Object.assign({}, user), model);
        const results = await this.usersPersistence.save(updatedUser);
        return new user_response_model_1.UserResponseModel(results);
    }
    async removeUser(params) {
        await this.usersPersistence.delete(params.id);
    }
};
__decorate([
    (0, common_1.Inject)(users_persistence_1.IUserPersistence),
    __metadata("design:type", Object)
], UsersController.prototype, "usersPersistence", void 0);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiResponse)({ type: users_list_response_model_1.UsersListResponseModel }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_users_request_model_1.FindUsersRequestModel]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersList", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ type: user_response_model_1.UserResponseModel }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_by_id_request_model_1.FindUserByIdRequestModel]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiResponse)({ type: user_response_model_1.UserResponseModel }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_request_model_1.CreateUserRequestModel]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiResponse)({ type: user_response_model_1.UserResponseModel }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_by_id_request_model_1.FindUserByIdRequestModel, update_user_request_model_1.UpdateUserRequestModel]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_by_id_request_model_1.FindUserByIdRequestModel]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('/users'),
    (0, swagger_1.ApiSecurity)('Access Token'),
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard)
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map