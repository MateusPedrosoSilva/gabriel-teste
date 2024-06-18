import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserTypeormEntity } from './user.entity';
import { ErrorLogTypeormEntity } from './error-log.entity';

@Entity('cameras')
export class CameraTypeormEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column()
  isEnable: boolean;

  @Column()
  custumerId: string;

  @ManyToOne(() => UserTypeormEntity, (user) => user.cameras)
  user: UserTypeormEntity;

  @OneToMany(() => ErrorLogTypeormEntity, (alertLog) => alertLog.camera_id)
  alertLogs: ErrorLogTypeormEntity[];
}
