import { Injectable } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { ErrorLogSearchStrategy } from './error-log.strategy';
import { ErrorLogTypeormEntity } from '../../entities/error-log.entity';

@Injectable()
export class DefaultSearchStrategy implements ErrorLogSearchStrategy {
  constructor(private errorLogRepository: Repository<ErrorLogTypeormEntity>) {}

  async list(): Promise<ErrorLogTypeormEntity[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    return this.errorLogRepository.find({
      where: {
        occurred_at: Between(startOfDay, endOfDay),
      },
    });
  }
}
