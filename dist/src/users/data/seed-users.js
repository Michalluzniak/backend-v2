"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const uuid_1 = require("../../common/types/uuid");
const faker_1 = require("@faker-js/faker");
const seedUsers = (numberOfUsers = 0) => Array.from({ length: numberOfUsers }).map(() => {
    const firstName = faker_1.faker.name.firstName();
    const lastName = faker_1.faker.name.lastName();
    const createdAt = faker_1.faker.date.past();
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    return {
        id: new uuid_1.UUID().toString(),
        email: `${username}@zaven.localhost`,
        phoneNumber: faker_1.faker.phone.number('+485########'),
        password: faker_1.faker.random.alpha({ count: 20, casing: 'mixed' }),
        birthday: faker_1.faker.date.birthdate({ min: 1980, max: 2000, mode: 'year' }).toISOString().substring(0, 10),
        website: `https://zaven.co/team/${firstName.toLowerCase().substring(0, 1)}${lastName.toLowerCase()}`,
        biography: faker_1.faker.company.catchPhrase(),
        updatedAt: createdAt,
        username,
        firstName,
        lastName,
        createdAt,
    };
});
exports.seedUsers = seedUsers;
//# sourceMappingURL=seed-users.js.map