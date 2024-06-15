import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ErrorLogTypeormRepository } from './error-log-typeorm.repository';
import { ErrorLogTypeormEntity } from '../entities/error-log.entity';
import { ErrorLog } from '../../../../domain/error-log';

describe('ErrorLogTypeormRepository tests', () => {
  let dataSource: DataSource;
  let typeormRepository: Repository<ErrorLogTypeormEntity>;
  let errorLogRepository: ErrorLogTypeormRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      database: 'gabriel_cameras_db',
      username: 'gabriel',
      password: 'Gabriel123',
      entities: [ErrorLogTypeormEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    typeormRepository = dataSource.getRepository(ErrorLogTypeormEntity);
    errorLogRepository = new ErrorLogTypeormRepository(typeormRepository);
  }, 30 * 1000);

  it('should insert a new error-log', async () => {
    const id = uuidv4();
    const occurred_at = new Date();
    const camera_id = uuidv4();
    const errorLog = new ErrorLog(id, occurred_at, camera_id);
    await errorLogRepository.insert(errorLog);
    const model = await typeormRepository.findOneBy({ id });
    expect(model).not.toBeNull();
    expect(model.id).toBe(id);
    expect(model.occurred_at).toStrictEqual(occurred_at);
    expect(model.camera_id).toBe(camera_id);
  });
});
