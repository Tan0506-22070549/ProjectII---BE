import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { QuerySeatDto } from './dto/query-seat.dto';
import { BulkGenerateDto } from './dto/bulk-generate.dto';
import { BulkUpdateStatusDto } from './dto/bulk-update-status.dto';

@ApiTags('Seats Management') // 👈 thêm dòng này
@Controller('seat')
export class SeatsController {
  constructor(private readonly service: SeatsService) {}

  @ApiOperation({ summary: 'Tạo 1 ghế' })
  @Post()
  create(@Body() dto: CreateSeatDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Danh sách ghế theo screenId' })
  @Get()
  findAll(@Query() q: QuerySeatDto) {
    return this.service.findAll(q);
  }

  @ApiOperation({ summary: 'Chi tiết ghế' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Cập nhật ghế' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSeatDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Xoá (soft delete) ghế' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @ApiOperation({ summary: 'Tạo lưới ghế A..Z x cột' })
  @Post('bulk/generate')
  bulkGenerate(@Body() dto: BulkGenerateDto) {
    return this.service.bulkGenerate(dto);
  }

  @ApiOperation({ summary: 'Đổi trạng thái nhiều ghế' })
  @Patch('bulk/status')
  bulkStatus(@Body() dto: BulkUpdateStatusDto) {
    return this.service.bulkUpdateStatus(dto);
  }
}
