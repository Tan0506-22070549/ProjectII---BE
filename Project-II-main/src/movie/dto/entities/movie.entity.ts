import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: 'date', nullable: true })
  release_date: Date; 

  @Column({ nullable: true })
  poster_url: string; 
}
