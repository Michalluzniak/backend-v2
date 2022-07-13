import { FindOptions, FindResults } from '../common/types/persistence';

export type UserPersistenceModel = {
  id: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  biography?: string;
  website?: string;
  birthday?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserPersistenceSaveModel = Omit<UserPersistenceModel, 'id' | 'createdAt' | 'updatedAt'>;

export interface UsersPersistence {
  save(model: UserPersistenceModel): Promise<UserPersistenceModel>;

  save(model: UserPersistenceSaveModel): Promise<UserPersistenceModel>;

  find(options?: FindOptions): Promise<FindResults<UserPersistenceModel[]>>;

  findById(id: string): Promise<UserPersistenceModel>;

  delete(id: string): Promise<void>;
}

export const IUserPersistence = Symbol('IUserPersistence');
