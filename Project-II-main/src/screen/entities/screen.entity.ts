import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Định nghĩa các định dạng màn hình
export enum ScreenFormat {
  STANDARD = 'Standard',
  IMAX = 'IMAX',
  THREE_D = '3D',
  DOLBY_CINEMA = 'Dolby Cinema',
}

@Entity() // Đánh dấu đây là một bảng trong database
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Tên màn hình (ví dụ: "Phòng 1", "Phòng IMAX")

  @Column('int')
  capacity: number; // Sức chứa (số ghế)

  @Column({
    type: 'enum',
    enum: ScreenFormat,
    default: ScreenFormat.STANDARD,
  })
  format: ScreenFormat; // Định dạng (IMAX, 3D...)

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  size_width_meters: number; // Kích cỡ chiều rộng (mét)

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  size_height_meters: number; // Kích cỡ chiều cao (mét)

  // Bạn có thể thêm các mối quan hệ sau này, ví dụ:
  // @ManyToOne(() => Cinema, cinema => cinema.screens)
  // cinema: Cinema;
  
  // @OneToMany(() => Showtime, showtime => showtime.screen)
  // showtimes: Showtime[];
}