import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CameraTypeormEntity } from './camera.entity';

@Entity('error_log')
export class ErrorLogTypeormEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
  })
  occurred_at: Date;

  @ManyToOne(() => CameraTypeormEntity, (camera) => camera.alertLogs)
  camera: CameraTypeormEntity;

  @Column()
  camera_id: string;
}
