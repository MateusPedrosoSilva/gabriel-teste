import { ErrorLog } from './error-log';
import { v4 as uuidv4 } from 'uuid';

describe('ErrorLog Unit Test', () => {
  it('should create a new error log', () => {
    const id = uuidv4();
    const occurred_at = new Date();
    const camera_id = uuidv4();
    const errorLog = new ErrorLog(id, occurred_at, camera_id);
    expect(errorLog.id).toBe(id);
    expect(errorLog.occurred_at).toBe(occurred_at);
    expect(errorLog.camera_id).toBe(camera_id);
  });
});
