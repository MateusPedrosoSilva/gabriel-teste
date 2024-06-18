import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ErrorLogSearchStrategy } from './error-log.strategy';
import { ErrorLogTypeormEntity } from '../../entities/error-log.entity';

@Injectable()
export class ClientSearchStrategy implements ErrorLogSearchStrategy {
  constructor(private errorLogRepository: Repository<ErrorLogTypeormEntity>) {}

  async list(params: { customerId: string }): Promise<ErrorLogTypeormEntity[]> {
    const result = this.errorLogRepository.find({
      where: {
        camera: {
          user: { id: params.customerId },
        },
      },
      relations: ['camera', 'camera.customer'],
    });
    console.log(result);
    return result;
  }
}
