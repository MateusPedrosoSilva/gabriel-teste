import { Camera } from './camera';
import { v4 as uuidv4 } from 'uuid';

describe('Camera Unit Test', () => {
  it('should create a new camera', () => {
    const id = uuidv4();
    const name = 'camera-1';
    const ip = '12.255.0.123';
    const isEnable = true;
    const custumerId = uuidv4();
    const camera = new Camera(id, name, ip, isEnable, custumerId);
    expect(camera.id).toBe(id);
    expect(camera.name).toBe(name);
    expect(camera.ip).toBe(ip);
    expect(camera.isEnable).toBe(isEnable);
    expect(camera.custumerId).toBe(custumerId);
  });

  it('should throw an error if IP is invalid', () => {
    const id = uuidv4();
    const name = 'camera-1';
    const ip = '256.256.256.256';
    const isEnable = true;
    const custumerId = uuidv4();
    expect(() => {
      new Camera(id, name, ip, isEnable, custumerId);
    }).toThrow(Error);
  });

  it('should not throw an error if IP is valid', () => {
    const id = uuidv4();
    const name = 'camera-1';
    const ip = '192.168.0.1';
    const isEnable = true;
    const custumerId = uuidv4();
    expect(() => {
      new Camera(id, name, ip, isEnable, custumerId);
    }).not.toThrow(Error);
  });
});
