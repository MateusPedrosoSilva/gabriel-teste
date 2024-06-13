import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
