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
      ip: camera.ip,
    });
    if (sameIpCamera.custumerId == camera.custumerId)
      throw new Error('camera with this IP already added to this custumer');
    const model = this.typeOrmRepository.create(camera);
    await this.typeOrmRepository.save(model);
  }

  async disable(id: string): Promise<void> {
    const camera = await this.typeOrmRepository.findOneBy({ id });
    if (!camera) throw new Error('camera not found');
    await this.typeOrmRepository.delete(camera);
  }
}
