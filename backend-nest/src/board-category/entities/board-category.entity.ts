import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BoardCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  slug: string;

  @Column({ length: 30 })
  label: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
