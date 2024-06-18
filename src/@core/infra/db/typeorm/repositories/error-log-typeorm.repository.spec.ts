import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ErrorLogTypeormRepository } from './error-log-typeorm.repository';
import { ErrorLogTypeormEntity } from '../entities/error-log.entity';
import { ErrorLog } from '../../../../domain/error-log';
import { UserTypeormEntity } from '../entities/user.entity';
import { CameraTypeormEntity } from '../entities/camera.entity';
import { ClientSearchStrategy } from './error-log-strategies/client.strategy';
import { TimeRangeSearchStrategy } from './error-log-strategies/time-range.strategy';
import { FromDateSearchStrategy } from './error-log-strategies/from-date.strategy';
import { DefaultSearchStrategy } from './error-log-strategies/default.strategy';
import { User } from '../../../../domain/user';
import { UserTypeOrmRepository } from './user-typeorm.repository';
import { Camera } from '../../../../domain/camera';
import { CameraTypeormRepository } from './camera-typeorm.repository';

describe('ErrorLogTypeormRepository tests', () => {
  let dataSource: DataSource;
  let typeormRepository: Repository<ErrorLogTypeormEntity>;
  let clientStrategy: ClientSearchStrategy;
  let timeRangeStrategy: TimeRangeSearchStrategy;
  let fromDateStrategy: FromDateSearchStrategy;
  let defaultStrategy: DefaultSearchStrategy;
  let errorLogRepository: ErrorLogTypeormRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      database: 'gabriel_cameras_db',
      username: 'gabriel',
      password: 'Gabriel123',
      entities: [UserTypeormEntity, CameraTypeormEntity, ErrorLogTypeormEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    typeormRepository = dataSource.getRepository(ErrorLogTypeormEntity);
    errorLogRepository = new ErrorLogTypeormRepository(
      clientStrategy,
      timeRangeStrategy,
      fromDateStrategy,
      defaultStrategy,
      typeormRepository,
    );
  }, 30 * 1000);

  it('should insert a new error-log', async () => {
    const id = uuidv4();
    const occurred_at = new Date();
    const camera_id = uuidv4();
    const errorLog = new ErrorLog(id, occurred_at, camera_id);
    await errorLogRepository.insert(errorLog);
    const model = await typeormRepository.findOneBy({ id });
    expect(model).not.toBeNull();
    expect(model).toEqual(errorLog);
    expect(model.id).toBe(id);
    expect(model.occurred_at).toStrictEqual(occurred_at);
    expect(model.camera_id).toBe(camera_id);
  });

  it('should list error-logs for a client', async () => {
    // add user
    const userId = uuidv4();
    const user = new User(userId, 'Mateus Pedroso');
    const userTypeormRepository = dataSource.getRepository(UserTypeormEntity);
    const userRepository = new UserTypeOrmRepository(userTypeormRepository);
    await userRepository.insert(user);
    const userTest = await userTypeormRepository.findOne({
      where: { id: userId },
    });
    expect(user).toEqual(userTest);

    // add camera
    const cameraId = uuidv4();
    const camera = new Camera(cameraId, 'camera-1', '12.23.43.1', true, userId);
    const cameraTypeormRepository =
      dataSource.getRepository(CameraTypeormEntity);
    const cameraRepository = new CameraTypeormRepository(
      cameraTypeormRepository,
    );
    await cameraRepository.insert(camera);
    const cameraTest = await cameraTypeormRepository.findOne({
      where: { id: cameraId },
    });
    expect(camera).toEqual(cameraTest);

    // add error log
    const errorLogId1 = uuidv4();
    const occurred_at1 = new Date();
    const errorLog1 = new ErrorLog(errorLogId1, occurred_at1, cameraId);
    await errorLogRepository.insert(errorLog1);
    const errorLogTest1 = await typeormRepository.findOneBy({
      id: errorLogId1,
    });
    const errorLogId2 = uuidv4();
    const occurred_at2 = new Date();
    const errorLog2 = new ErrorLog(errorLogId2, occurred_at2, cameraId);
    await errorLogRepository.insert(errorLog2);
    const errorLogTest2 = await typeormRepository.findOneBy({
      id: errorLogId2,
    });
    expect(errorLogTest1).toEqual(errorLog1);
    expect(errorLogTest2).toEqual(errorLog2);

    // get list of errors
    // TODO: fix this test
    // const errorLogs = await clientStrategy.list({ customerId: userId });
  });
});
