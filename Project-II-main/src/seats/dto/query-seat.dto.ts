import { IsEnum, IsOptional, IsUUID, IsString, IsInt, Min } from 'class-validator';
import { SeatType, SeatStatus } from '../enums';

export class QuerySeatDto {
  @IsUUID() screenId: string;

  @IsOptional() @IsEnum(SeatType) type?: SeatType;
  @IsOptional() @IsEnum(SeatStatus) status?: SeatStatus;
  @IsOptional() @IsString() row?: string;

  @IsOptional() @IsInt() @Min(0) skip?: number;
  @IsOptional() @IsInt() @Min(1) take?: number;
}
