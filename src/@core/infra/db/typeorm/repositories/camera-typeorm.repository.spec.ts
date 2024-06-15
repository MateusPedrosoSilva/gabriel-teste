import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CameraTypeormEntity } from '../entities/camera.entity';
import { CameraTypeormRepository } from './camera-typeorm.repository';
import { Camera } from '../../../../domain/camera';

describe('CameraTypeormRepository tests', () => {
  let dataSource: DataSource;
  let typeormRepository: Repository<CameraTypeormEntity>;
  let cameraRepository: CameraTypeormRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      database: 'gabriel_cameras_db',
      username: 'gabriel',
      password: 'Gabriel123',
      entities: [CameraTypeormEntity],
      synchronize: true,
    });
    await dataSource.initialize();
    typeormRepository = dataSource.getRepository(CameraTypeormEntity);
    cameraRepository = new CameraTypeormRepository(typeormRepository);
  }, 30 * 1000);

  it('should insert a new user', async () => {
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    await cameraRepository.insert(camera);
    const model = await typeormRepository.findOneBy({ id });
    expect(model).not.toBeNull();
    expect(model.id).toBe(id);
    expect(model.name).toBe(name);
    expect(model.ip).toBe(ip);
    expect(model.isEnable).toBe(isEnable);
    expect(model.custumerId).toBe(custumerId);
  });
});
