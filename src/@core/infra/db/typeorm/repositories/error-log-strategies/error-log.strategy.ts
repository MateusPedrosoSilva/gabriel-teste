import { ErrorLogTypeormEntity } from '../../entities/error-log.entity';

export interface ErrorLogSearchStrategy {
  list(params: any): Promise<ErrorLogTypeormEntity[]>;
}
