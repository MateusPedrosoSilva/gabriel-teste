import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CameraTypeormEntity } from './camera.entity';

@Entity('users')
export class UserTypeormEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => CameraTypeormEntity, (camera) => camera.user)
  cameras: CameraTypeormEntity[];
}
