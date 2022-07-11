import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IUserPersistence } from './users.persistence';
import { UsersInMemoryPersistence } from './persistence/users-in-memory.persistence';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: IUserPersistence,
      useClass: UsersInMemoryPersistence,
    },
  ],
})
export class UsersModule {}
