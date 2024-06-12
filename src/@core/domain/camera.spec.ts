import { Camera } from './camera';

describe('Camera Unit Test', () => {
  it('should create a new camera', () => {
    const camera = new Camera('123', 'camera-1', '12.255.0.123', true, '111');
    expect(camera.id).toBe('123');
    expect(camera.name).toBe('camera-1');
    expect(camera.ip).toBe('12.255.0.123');
    expect(camera.isEnable).toBe(true);
    expect(camera.custumerId).toBe('111');
  });
});
