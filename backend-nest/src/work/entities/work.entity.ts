// src/work/entities/work.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkTag } from '../../work-tag/entities/work-tag.entity';
import { Base } from '../../common/base/base';

@Entity()
export class Work extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  projectUrl: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  repoUrl: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  role: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: false })
  highlighted: boolean;

  @ManyToMany(() => WorkTag, (tag) => tag.works, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  tags: WorkTag[];
}
