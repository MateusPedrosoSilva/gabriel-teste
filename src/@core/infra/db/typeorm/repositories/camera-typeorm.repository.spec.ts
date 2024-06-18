import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CameraTypeormEntity } from '../entities/camera.entity';
import { CameraTypeormRepository } from './camera-typeorm.repository';
import { Camera } from '../../../../domain/camera';
import { UserTypeormEntity } from '../entities/user.entity';
import { ErrorLogTypeormEntity } from '../entities/error-log.entity';

describe('CameraTypeormRepository tests', () => {
  let dataSource: DataSource;
  let typeormRepository: Repository<CameraTypeormEntity>;
  let cameraRepository: CameraTypeormRepository;

  beforeEach(async () => {
    // TODO: Adicionar variaveis de ambiente
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
    typeormRepository = dataSource.getRepository(CameraTypeormEntity);
    cameraRepository = new CameraTypeormRepository(typeormRepository);
  }, 30 * 1000);

  it('should insert a new camera', async () => {
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    await cameraRepository.insert(camera);
    const model = await typeormRepository.findOneBy({ id });
    expect(model).not.toBeNull();
    expect(model).toEqual(camera);
    expect(model.id).toBe(id);
    expect(model.name).toBe(name);
    expect(model.ip).toBe(ip);
    expect(model.isEnable).toBe(isEnable);
    expect(model.custumerId).toBe(custumerId);
  });

  it('should throw error for bad ip format', async () => {
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '1123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    expect(() => {
      new Camera(id, name, ip, isEnable, custumerId);
    }).toThrow(Error('Invalid IP address'));
  });

  it('should disable a camera', async () => {
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    await cameraRepository.insert(camera);
    const model = await typeormRepository.findOneBy({ id });
    expect(model).not.toBeNull();
    expect(model).toEqual(camera);
    await cameraRepository.disable(model.id);
    const modelDisabled = await typeormRepository.findOneBy({ id });
    expect(modelDisabled.isEnable).toBe(false);
  });

  it('should throw Error for camera not found when disabling', async () => {
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    await cameraRepository.insert(camera);
    const wrongId = uuidv4();
    expect(async () => {
      await cameraRepository.disable(wrongId);
    }).rejects.toThrow(Error('camera not found'));
  });

  it('should throw error for already added ip camera to custumer', async () => {
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    await cameraRepository.insert(camera);
    const newId = uuidv4();
    const newName = 'Camera-2';
    const cameraSameIP = new Camera(newId, newName, ip, isEnable, custumerId);
    expect(async () => {
      await cameraRepository.insert(cameraSameIP);
    }).rejects.toThrow(
      Error('camera with this IP already added to this custumer'),
    );
  });

  it('should list cameras for status true (active)', async () => {
    const cameras = await cameraRepository.list(true);
    const id = uuidv4();
    const name = 'Camera-1';
    const ip = '123.12.0.2';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    await cameraRepository.insert(camera);
    expect(await cameraRepository.list(true)).toHaveLength(cameras.length + 1);
    await cameraRepository.disable(id);
    expect(await cameraRepository.list(true)).toHaveLength(cameras.length);
  });

  it('should throw error for no cameras registered', async () => {
    await cameraRepository.removeAllCameras();
    const cameras = await typeormRepository.find();
    console.log(cameras);
    expect(async () => {
      await cameraRepository.list(true);
    }).rejects.toThrow(Error);
  });
});
