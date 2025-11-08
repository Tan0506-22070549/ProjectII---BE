import { IsUUID, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { SeatStatus } from '../enums';

export class BulkUpdateStatusDto {
  @IsUUID() screenId: string;
  @IsArray() @ArrayNotEmpty() seatIds: string[];
  @IsEnum(SeatStatus) status: SeatStatus; // ACTIVE | BLOCKED
}
