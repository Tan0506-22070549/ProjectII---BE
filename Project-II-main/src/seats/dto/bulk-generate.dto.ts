import { IsUUID, IsInt, Min, IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { SeatType } from '../enums';

export class BulkGenerateDto {
  @IsUUID() screenId: string;
  @IsString() rowStart: string; // "A"
  @IsString() rowEnd: string;   // "F"
  @IsInt() @Min(1) cols: number;

  @IsOptional() @IsEnum(SeatType) defaultType?: SeatType;
  @IsOptional() @IsNumber() defaultMultiplier?: number; // 1.0
}
