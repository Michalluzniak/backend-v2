import { UsersInMemoryPersistence } from './users-in-memory.persistence';
import { UsersPersistence } from '../users.persistence';
import { UserAlreadyExistsError } from '../errors/user-already-exists.error';

const numberOfTestUsers = 10;

describe('UsersInMemoryPersistence', () => {
  let persistence: UsersPersistence;

  beforeEach(() => {
    persistence = new UsersInMemoryPersistence();
    Array.from({ length: numberOfTestUsers }).forEach((v, i) =>
      persistence.save({
        email: `test.${i}@localhost`,
        username: `test.${i}.localhost`,
        password: 'password',
      }),
    );
  });

  describe('.find()', () => {
    it('should return all existing users', async () => {
      const results = await persistence.find();

      expect(results.total).toEqual(numberOfTestUsers);
    });

    it('should splice array by given offset', async () => {
      const results = await persistence.find({ offset: 1 });

      expect(results.rows.length).toEqual(numberOfTestUsers - 1);
    });

    it('should splice array by given limit', async () => {
      const results = await persistence.find({ limit: 3 });

      expect(results.rows.length).toEqual(3);
    });

    it('should splice array by given offset and limit', async () => {
      const results = await persistence.find({ offset: 5, limit: 3 });

      expect(results.rows.length).toEqual(3);
    });

    it('should splice array by given offset and limit when limit is greater than elements', async () => {
      const results = await persistence.find({ offset: 5, limit: 50 });

      expect(results.rows.length).toEqual(5);
    });
  });

  describe('.save()', () => {
    it('should return duplicate error while duplicating email', async () => {
      await expect(() =>
        persistence.save({
          email: 'test.1@localhost',
          username: 'username',
          password: 'password',
        }),
      ).rejects.toThrow(new UserAlreadyExistsError('email'));
    });

    it('should return duplicate error while duplicating username', async () => {
      await expect(() =>
        persistence.save({
          email: 'test.114@localhost',
          username: 'test.1.localhost',
          password: 'password',
        }),
      ).rejects.toThrow(new UserAlreadyExistsError('username'));
    });
  });
});
