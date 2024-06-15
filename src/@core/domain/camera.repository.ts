import { Camera } from './camera';

export interface CameraRepository {
  insert(camera: Camera): Promise<void>;
}
