import {
  Entity, PrimaryGeneratedColumn, Column, Index,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn
} from 'typeorm';
import { SeatType, SeatStatus } from './enums';

@Entity('seats')
@Index(['screenId', 'row', 'col'], { unique: true })
@Index(['screenId', 'label'], { unique: true })
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  screenId: string; // FK tới screen

  @Column({ type: 'varchar', length: 8 })
  row: string; // A, B, C...

  @Column({ type: 'int' })
  col: number; // 1,2,3...

  @Column({ type: 'varchar', length: 16 })
  label: string; // "A1"

  @Column({ type: 'enum', enum: SeatType, default: SeatType.STANDARD })
  type: SeatType;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.ACTIVE })
  status: SeatStatus;

  @Column({ type: 'boolean', default: false })
  isAisle: boolean;

  @Column({ type: 'boolean', default: false })
  isWheelchair: boolean;

  @Column({ type: 'float', nullable: true })
  priceMultiplier: number | null; // 1.0, 1.2,...

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @DeleteDateColumn() deletedAt?: Date | null;
}
