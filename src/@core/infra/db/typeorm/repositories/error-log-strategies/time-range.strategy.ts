import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { ErrorLogSearchStrategy } from './error-log.strategy';
import { ErrorLogTypeormEntity } from '../../entities/error-log.entity';

@Injectable()
export class TimeRangeSearchStrategy implements ErrorLogSearchStrategy {
  constructor(private errorLogRepository: Repository<ErrorLogTypeormEntity>) {}

  async list(params: {
    start: Date;
    end: Date;
  }): Promise<ErrorLogTypeormEntity[]> {
    return this.errorLogRepository.find({
      where: {
        occurred_at: Between(params.start, params.end),
      },
    });
  }
}
