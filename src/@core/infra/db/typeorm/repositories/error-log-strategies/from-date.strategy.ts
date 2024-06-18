import { Injectable } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { ErrorLogSearchStrategy } from './error-log.strategy';
import { ErrorLogTypeormEntity } from '../../entities/error-log.entity';

@Injectable()
export class FromDateSearchStrategy implements ErrorLogSearchStrategy {
  constructor(private errorLogRepository: Repository<ErrorLogTypeormEntity>) {}

  async list(params: { from: Date }): Promise<ErrorLogTypeormEntity[]> {
    return this.errorLogRepository.find({
      where: {
        occurred_at: MoreThanOrEqual(params.from),
      },
    });
  }
}
