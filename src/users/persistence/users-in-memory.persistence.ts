import { UserPersistenceModel, UserPersistenceSaveModel, UsersPersistence } from '../users.persistence';
import { UUID } from '../../common/types/uuid';
import { UserAlreadyExistsError } from '../errors/user-already-exists.error';
import { FindOptions, FindResults } from '../../common/types/persistence';
import { UserNotFoundError } from '../errors/user-not-found.error';

type SaveModel = UserPersistenceModel | UserPersistenceSaveModel;

export class UsersInMemoryPersistence implements UsersPersistence {
  private readonly users = new Map<string, UserPersistenceModel>();
  private readonly usernames = new Set<string>();
  private readonly emails = new Set<string>();

  constructor(models?: UserPersistenceModel[]) {
    models?.forEach((model) => {
      this.users.set(model.id.toLowerCase(), UsersInMemoryPersistence.normalizeUserModel(model));
      this.usernames.add(model.username);
      this.emails.add(model.email);
    });
  }

  private static createUserModel(model: UserPersistenceSaveModel): UserPersistenceModel {
    return UsersInMemoryPersistence.normalizeUserModel({
      ...model,
      id: new UUID().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private static normalizeUserModel(model: UserPersistenceModel): UserPersistenceModel {
    return {
      ...model,
      id: model.id.toLowerCase(),
      email: model.email.toLowerCase().trim(),
      username: model.username.toLowerCase().trim(),
    };
  }

  async find(options?: FindOptions): Promise<FindResults<UserPersistenceModel[]>> {
    const offset = options?.offset || 0;
    const limit = options?.limit ? offset + options?.limit || 0 : this.users.size;

    return {
      total: this.users.size,
      rows: [...this.users.values()].slice(offset, limit),
    };
  }

  async findById(id: string): Promise<UserPersistenceModel> {
    if (!this.users.has(id.toLowerCase())) {
      throw new UserNotFoundError();
    }

    return this.users.get(id.toLowerCase());
  }

  async save(model: SaveModel): Promise<UserPersistenceModel> {
    const alreadyExists = 'id' in model && 'createdAt' in model && 'updatedAt' in model;
    const user = alreadyExists
      ? UsersInMemoryPersistence.normalizeUserModel(model)
      : UsersInMemoryPersistence.createUserModel(model);

    if (!alreadyExists && this.emails.has(user.email)) {
      throw new UserAlreadyExistsError('email');
    } else if (!alreadyExists && this.usernames.has(user.username)) {
      throw new UserAlreadyExistsError('username');
    }

    this.users.set(user.id, user);
    this.emails.add(user.email);
    this.usernames.add(user.username);

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    this.users.delete(user.id);
    this.usernames.delete(user.username);
    this.emails.delete(user.email);
  }
}
