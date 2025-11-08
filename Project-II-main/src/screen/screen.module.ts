import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { Screen } from './entities/screen.entity'; // Import entity

@Module({
  imports: [TypeOrmModule.forFeature([Screen])], // Thêm dòng này
  controllers: [ScreenController],
  providers: [ScreenService],
})
export class ScreenModule {}