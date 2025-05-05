import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  adminId: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'tinyint', width: 1, default: true })
  isActive: boolean;
}
