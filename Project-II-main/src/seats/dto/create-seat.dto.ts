import { IsUUID, IsString, IsInt, Min, IsEnum, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { SeatType, SeatStatus } from '../enums';

export class CreateSeatDto {
  @IsUUID() screenId: string;
  @IsString() row: string;
  @IsInt() @Min(1) col: number;
  @IsString() label: string;

  @IsOptional() @IsEnum(SeatType) type?: SeatType;
  @IsOptional() @IsEnum(SeatStatus) status?: SeatStatus;
  @IsOptional() @IsBoolean() isAisle?: boolean;
  @IsOptional() @IsBoolean() isWheelchair?: boolean;
  @IsOptional() @IsNumber() priceMultiplier?: number;
}
