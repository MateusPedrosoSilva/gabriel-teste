import { Repository } from 'typeorm';
import { ErrorLogTypeormEntity } from '../entities/error-log.entity';
import { ErrorLogRepository } from 'src/@core/domain/error-log.repository';
import { ErrorLog } from 'src/@core/domain/error-log';
import { ClientSearchStrategy } from './error-log-strategies/client.strategy';
import { TimeRangeSearchStrategy } from './error-log-strategies/time-range.strategy';
import { FromDateSearchStrategy } from './error-log-strategies/from-date.strategy';
import { DefaultSearchStrategy } from './error-log-strategies/default.strategy';

export class ErrorLogTypeormRepository implements ErrorLogRepository {
  [x: string]: any;
  constructor(
    private readonly clientStrategy: ClientSearchStrategy,
    private readonly timeRangeStrategy: TimeRangeSearchStrategy,
    private readonly fromDateStrategy: FromDateSearchStrategy,
    private readonly defaultStrategy: DefaultSearchStrategy,
    private readonly typeOrmRepository: Repository<ErrorLogTypeormEntity>,
  ) {}

  async insert(errorLog: ErrorLog): Promise<void> {
    const model = this.typeOrmRepository.create(errorLog);
    await this.typeOrmRepository.save(model);
  }

  async list(params: any): Promise<ErrorLogTypeormEntity[]> {
    console.log(params);
    if (params.customerId) return this.clientStrategy.list(params);
    if (params.start && params.end) return this.timeRangeStrategy.list(params);
    if (params.from) return this.fromDateStrategy.list(params);
    return this.defaultStrategy.list();
  }
}
