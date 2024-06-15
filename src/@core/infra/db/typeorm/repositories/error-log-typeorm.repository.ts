import { Repository } from 'typeorm';
import { ErrorLogTypeormEntity } from '../entities/error-log.entity';
import { ErrorLogRepository } from 'src/@core/domain/error-log.repository';
import { ErrorLog } from 'src/@core/domain/error-log';

export class ErrorLogTypeormRepository implements ErrorLogRepository {
  constructor(
    private readonly typeOrmRepository: Repository<ErrorLogTypeormEntity>,
  ) {}

  async insert(errorLog: ErrorLog): Promise<void> {
    const model = this.typeOrmRepository.create(errorLog);
    await this.typeOrmRepository.save(model);
  }
}
