import { ErrorLog } from './error-log';

export interface ErrorLogRepository {
  insert(errorLog: ErrorLog): Promise<void>;

  list(params: {
    customerId?: string;
    start?: Date;
    end?: Date;
    from?: Date;
  }): Promise<any[]>;
}
