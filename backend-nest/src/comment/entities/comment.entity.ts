import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  COMMENTABLE_TYPES,
  CommentableType,
} from '../../common/constants/commentable-type';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  content: string;

  @Column({ length: 10 })
  nickname: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  commentableId: number;

  @Column({ type: 'enum', enum: COMMENTABLE_TYPES })
  commentableType: CommentableType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
