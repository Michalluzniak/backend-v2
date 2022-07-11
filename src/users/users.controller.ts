import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IUserPersistence, UsersPersistence } from './users.persistence';
import { CreateUserRequestModel } from './models/requests/create-user-request.model';
import { Pagination, SuccessResponse } from '../common/types/response';
import { FindUserByIdRequestModel } from './models/requests/find-user-by-id-request.model';
import { UpdateUserRequestModel } from './models/requests/update-user-request.model';
import { FindUsersRequestModel } from './models/requests/find-users-request.model';
import { UsersListResponseModel } from './models/response/users-list-response.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  @Inject(IUserPersistence)
  private readonly usersPersistence: UsersPersistence;

  @Get('/')
  @ApiResponse({ type: UsersListResponseModel })
  async getUsersList(
    @Query() query: FindUsersRequestModel,
  ): Promise<UsersListResponseModel> {
    const findOptions = Pagination.calculateOffset(query);
    const results = await this.usersPersistence.find(findOptions);
    const pagination = Pagination.ofTotalResults({
      totalResults: results.total,
      ...query,
    });

    return new UsersListResponseModel(results.rows, pagination);
  }

  @Get('/:id')
  async getUserById(@Param() params: FindUserByIdRequestModel) {
    const user = await this.usersPersistence.findById(params.id);

    return new SuccessResponse(user);
  }

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() model: CreateUserRequestModel) {
    const user = await this.usersPersistence.save(model);

    return new SuccessResponse(user);
  }

  @Patch('/:id')
  async updateUser(
    @Param() params: FindUserByIdRequestModel,
    @Body() model: UpdateUserRequestModel,
  ) {
    const user = await this.usersPersistence.findById(params.id);
    const updatedUser = { ...model, ...user };
    const results = await this.usersPersistence.save(updatedUser);

    return new SuccessResponse(results);
  }

  @Delete('/:id')
  @HttpCode(204)
  async removeUser(@Param() params: FindUserByIdRequestModel) {
    await this.usersPersistence.delete(params.id);
  }
}
