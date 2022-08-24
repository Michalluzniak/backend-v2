import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { IUserPersistence, UsersPersistence } from './users.persistence';
import { CreateUserRequestModel } from './models/requests/create-user-request.model';
import { Pagination } from '../common/types/response';
import { FindUserByIdRequestModel } from './models/requests/find-user-by-id-request.model';
import { UpdateUserRequestModel } from './models/requests/update-user-request.model';
import { FindUsersRequestModel } from './models/requests/find-users-request.model';
import { UsersListResponseModel } from './models/response/users-list-response.model';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { UserResponseModel } from './models/response/user-response.model';
import { AccessTokenGuard } from '../authorization/guards/access-token.guard';

@Controller('/users')
@ApiSecurity('bearer')
@UseGuards(AccessTokenGuard)
export class UsersController {
  @Inject(IUserPersistence)
  private readonly usersPersistence: UsersPersistence;

  @Get('/')
  @ApiResponse({ type: UsersListResponseModel })
  async getUsersList(@Query() query: FindUsersRequestModel) {
    const findOptions = {
      search: query.search,
      ...Pagination.calculateOffset(query),
    };
    const results = await this.usersPersistence.find(findOptions);
    const pagination = Pagination.ofTotalResults({
      totalResults: results.total,
      ...query,
    });

    return new UsersListResponseModel(results.rows, pagination);
  }

  @Get('/:id')
  @ApiResponse({ type: UserResponseModel })
  async getUserById(@Param() params: FindUserByIdRequestModel) {
    const user = await this.usersPersistence.findById(params.id);

    return new UserResponseModel(user);
  }

  @Post('/')
  @HttpCode(201)
  @ApiResponse({ type: UserResponseModel })
  async createUser(@Body() model: CreateUserRequestModel) {
    const user = await this.usersPersistence.save(model);

    return new UserResponseModel(user);
  }

  @Patch('/:id')
  @ApiResponse({ type: UserResponseModel })
  async updateUser(@Param() params: FindUserByIdRequestModel, @Body() model: UpdateUserRequestModel) {
    const user = await this.usersPersistence.findById(params.id);
    const updatedUser = { ...user, ...model };
    const results = await this.usersPersistence.save(updatedUser);

    return new UserResponseModel(results);
  }

  @Delete('/:id')
  @HttpCode(204)
  async removeUser(@Param() params: FindUserByIdRequestModel) {
    await this.usersPersistence.delete(params.id);
  }
}
