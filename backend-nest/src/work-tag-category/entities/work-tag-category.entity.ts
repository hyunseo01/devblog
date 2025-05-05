import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkTag } from '../../work-tag/entities/work-tag.entity';

@Entity()
export class WorkTagCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @OneToMany(() => WorkTag, (tag) => tag.category)
  tags: WorkTag[];
}
