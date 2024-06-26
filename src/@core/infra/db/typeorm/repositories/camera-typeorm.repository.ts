import { CameraRepository } from 'src/@core/domain/camera.repository';
import { Repository } from 'typeorm';
import { CameraTypeormEntity } from '../entities/camera.entity';
import { Camera } from 'src/@core/domain/camera';

export class CameraTypeormRepository implements CameraRepository {
  constructor(
    private readonly typeOrmRepository: Repository<CameraTypeormEntity>,
  ) {}

  async insert(camera: Camera): Promise<void> {
    const sameIpCamera = await this.typeOrmRepository.findOneBy({
      custumerId: camera.custumerId,
      ip: camera.ip,
    });
    if (sameIpCamera)
      throw new Error('camera with this IP already added to this custumer');
    const model = this.typeOrmRepository.create(camera);
    await this.typeOrmRepository.save(model);
  }

  async disable(id: string): Promise<void> {
    const camera = await this.typeOrmRepository.findOneBy({ id });
    if (!camera) throw new Error('camera not found');
    await this.typeOrmRepository.update(id, { isEnable: false });
  }

  async list(status: boolean): Promise<any[]> {
    const cameras = await this.typeOrmRepository.findBy({ isEnable: status });
    if (!cameras) throw new Error(`no cameras with status ${status}`);
    return cameras;
  }

  async removeAllCameras(): Promise<void> {
    const cameras = await this.typeOrmRepository.find();
    for (const camera of cameras) {
      await this.typeOrmRepository.remove(camera);
    }
  }
}
