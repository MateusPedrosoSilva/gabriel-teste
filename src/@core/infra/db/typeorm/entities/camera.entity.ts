import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
