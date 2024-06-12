import { ErrorLog } from './error-log';

describe('ErrorLog Unit Test', () => {
  it('should create a new error log', () => {
    const occurerDate = new Date();
    const camera = new ErrorLog('123', occurerDate, 'camera-1');
    expect(camera.id).toBe('123');
    expect(camera.occurred_At).toBe(occurerDate);
    expect(camera.cameda_id).toBe('camera-1');
  });
});
