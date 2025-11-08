import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ScreenService } from './screen.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Screen } from './entities/screen.entity';

@ApiTags('Screen Management') // Nhóm các API này dưới tên 'Screen Management' trên Swagger
@Controller('screen')
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo một phòng chiếu mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công.', type: Screen })
  create(@Body() createScreenDto: CreateScreenDto) {
    return this.screenService.create(createScreenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả phòng chiếu' })
  @ApiResponse({ status: 200, description: 'Danh sách phòng chiếu.', type: [Screen] })
  findAll() {
    return this.screenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết một phòng chiếu bằng ID' })
  @ApiResponse({ status: 200, description: 'Chi tiết phòng chiếu.', type: Screen })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng chiếu.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.screenService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin phòng chiếu' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công.', type: Screen })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScreenDto: UpdateScreenDto,
  ) {
    return this.screenService.update(id, updateScreenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa một phòng chiếu' })
  @ApiResponse({ status: 200, description: 'Xóa thành công.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.screenService.remove(id);
  }
}