import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('error_log')
export class ErrorLogTypeormEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  occurred_at: Date;

  @Column()
  camera_id: string;
}
