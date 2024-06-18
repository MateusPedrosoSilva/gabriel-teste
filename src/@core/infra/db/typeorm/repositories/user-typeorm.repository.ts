import { Repository } from 'typeorm';
import { User } from '../../../../domain/user';
import { UserRepository } from '../../../../domain/user.repository';
import { UserTypeormEntity } from '../entities/user.entity';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    private readonly typeOrmRepository: Repository<UserTypeormEntity>,
  ) {}

  async insert(user: User): Promise<void> {
    const model = this.typeOrmRepository.create(user);
    await this.typeOrmRepository.save(model);
  }
}
