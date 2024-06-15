import { CameraRepository } from 'src/@core/domain/camera.repository';
import { Repository } from 'typeorm';
import { CameraTypeormEntity } from '../entities/camera.entity';
import { Camera } from 'src/@core/domain/camera';

export class CameraTypeormRepository implements CameraRepository {
  constructor(
    private readonly typeOrmRepository: Repository<CameraTypeormEntity>,
  ) {}

  async insert(camera: Camera): Promise<void> {
    const model = this.typeOrmRepository.create(camera);
    await this.typeOrmRepository.save(model);
    console.log(model);
  }
}
