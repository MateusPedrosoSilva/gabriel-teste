import { User } from './user';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(name: string) {
    const newUser = new User('123', name);
    this.userRepository.insert(newUser);
    return newUser;
  }
}
