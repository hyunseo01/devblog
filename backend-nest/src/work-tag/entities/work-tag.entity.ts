import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Work } from '../../work/entities/work.entity';
import { WorkTagCategory } from '../../work-tag-category/entities/work-tag-category.entity';

@Entity()
export class WorkTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string; // 예: NestJS, React 등 태그명

  @ManyToOne(() => WorkTagCategory, (category) => category.tags, {
    nullable: false,
    eager: true, // 카테고리 자동 조인
  })
  @JoinColumn({ name: 'categoryId' })
  category: WorkTagCategory;

  @ManyToMany(() => Work, (work) => work.tags)
  works: Work[];
}
