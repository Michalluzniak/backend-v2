import { UUID } from '../../common/types/uuid';
import { faker } from '@faker-js/faker';
import { UserPersistenceModel } from '../users.persistence';

export const seedUsers = (numberOfUsers = 0): UserPersistenceModel[] =>
  Array.from({ length: numberOfUsers }).map(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const createdAt = faker.date.past();
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;

    return {
      id: new UUID().toString(),
      email: `${username}@zaven.localhost`,
      phoneNumber: faker.phone.number('+48 ### ### ###'),
      password: faker.random.alpha({ count: 20, casing: 'mixed' }),
      birthday: faker.date.birthdate({ min: 1980, max: 2000, mode: 'year' }).toISOString().substring(0, 10),
      website: `https://zaven.co/team/${firstName.toLowerCase().substring(0, 1)}${lastName.toLowerCase()}`,
      biography: faker.company.catchPhrase(),
      updatedAt: createdAt,
      username,
      firstName,
      lastName,
      createdAt,
    };
  });
