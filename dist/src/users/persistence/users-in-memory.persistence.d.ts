import { UserPersistenceModel, UserPersistenceSaveModel, UsersPersistence } from '../users.persistence';
import { FindOptions, FindResults } from '../../common/types/persistence';
declare type SaveModel = UserPersistenceModel | UserPersistenceSaveModel;
export declare class UsersInMemoryPersistence implements UsersPersistence {
    private readonly users;
    private readonly usernames;
    private readonly emails;
    constructor(models?: UserPersistenceModel[]);
    private static createUserModel;
    private static normalizeUserModel;
    private static _findUserFilter;
    find(options?: FindOptions): Promise<FindResults<UserPersistenceModel[]>>;
    findById(id: string): Promise<UserPersistenceModel>;
    save(model: SaveModel): Promise<UserPersistenceModel>;
    delete(id: string): Promise<void>;
}
export {};
