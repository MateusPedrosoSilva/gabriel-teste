import { User } from './user';

export interface UserRepository {
  insert(user: User): Promise<void>;
}
