import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('error_log')
export class ErrorLogTypeormEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
  })
  occurred_at: Date;

  @Column()
  camera_id: string;
}
