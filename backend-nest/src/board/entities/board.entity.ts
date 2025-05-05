import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BoardCategory } from '../../board-category/entities/board-category.entity';
import { Base } from '../../common/base/base';

@Entity()
export class Board extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => BoardCategory, { eager: true })
  @JoinColumn()
  category: BoardCategory;

  @Column({ default: false })
  highlighted: boolean;
}
