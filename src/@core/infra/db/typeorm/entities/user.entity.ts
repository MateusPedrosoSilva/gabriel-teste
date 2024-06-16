import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserTypeormEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;
}
