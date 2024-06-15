import { DataSource, Repository } from 'typeorm';
import { UserTypeormEntity } from '../entities/user.entity';
import { UserTypeOrmRepository } from './user-typeorm.repository';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../../domain/user';

describe('UserTypeormRepository tests', () => {
  let dataSource: DataSource;
  let typeormRepository: Repository<UserTypeormEntity>;
  let userRepository: UserTypeOrmRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      database: 'gabriel_cameras_db',
      username: 'gabriel',
      password: 'Gabriel123',
      entities: [UserTypeormEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    typeormRepository = dataSource.getRepository(UserTypeormEntity);
    userRepository = new UserTypeOrmRepository(typeormRepository);
  }, 30 * 1000);

  it('should insert a new user', async () => {
    const id = uuidv4();
    const name = 'Mateus Pedroso';
    const user = new User(id, name);
    await userRepository.insert(user);
    const model = await typeormRepository.findOneBy({ id });
    expect(model).not.toBeNull();
    expect(model.id).toBe(id);
    expect(model.name).toBe(name);
  });
});
