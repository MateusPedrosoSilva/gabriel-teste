import { ErrorLog } from './error-log';

export interface ErrorLogRepository {
  insert(errorLog: ErrorLog): Promise<void>;
}
