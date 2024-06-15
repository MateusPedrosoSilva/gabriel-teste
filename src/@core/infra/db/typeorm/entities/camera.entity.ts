import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cameras')
export class CameraTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
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
