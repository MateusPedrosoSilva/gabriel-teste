import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('error_log')
export class ErrorLogTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  occurred_at: Date;

  @Column()
  camera_id: string;
}
