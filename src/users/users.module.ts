import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { IUserPersistence } from './users.persistence';
import { UsersInMemoryPersistence } from './persistence/users-in-memory.persistence';
import { seedUsers } from './data/seed-users';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    {
      provide: IUserPersistence,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const numberOfUsers = +(configService.get<string>('SEED_USERS_COUNT') || 0);

        return new UsersInMemoryPersistence(seedUsers(numberOfUsers));
      },
    },
  ],
})
export class UsersModule {}
