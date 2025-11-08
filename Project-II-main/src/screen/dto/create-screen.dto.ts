import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  Min,
  IsOptional,
} from 'class-validator';
import { ScreenFormat } from '../entities/screen.entity';

export class CreateScreenDto {
  @ApiProperty({ example: 'Phòng chiếu 1', description: 'Tên phòng chiếu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 120, description: 'Sức chứa (số ghế)' })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({
    enum: ScreenFormat,
    example: ScreenFormat.IMAX,
    description: 'Định dạng phòng chiếu',
  })
  @IsEnum(ScreenFormat)
  @IsNotEmpty()
  format: ScreenFormat;

  @ApiProperty({
    example: 21.3,
    description: 'Chiều rộng màn hình (mét)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  size_width_meters?: number;

  @ApiProperty({
    example: 11.7,
    description: 'Chiều cao màn hình (mét)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  size_height_meters?: number;
}