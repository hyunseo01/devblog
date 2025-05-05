import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../common/base/base';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  name: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: 'user', length: 20 })
  role: string;
}
