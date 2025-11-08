import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { Screen } from './entities/screen.entity';

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private screenRepository: Repository<Screen>,
  ) {}

  async create(createScreenDto: CreateScreenDto): Promise<Screen> {
    const newScreen = this.screenRepository.create(createScreenDto);
    return this.screenRepository.save(newScreen);
  }

  findAll(): Promise<Screen[]> {
    return this.screenRepository.find();
  }

  async findOne(id: number): Promise<Screen> {
    const screen = await this.screenRepository.findOneBy({ id });
    if (!screen) {
      throw new NotFoundException(`Screen with ID "${id}" not found`);
    }
    return screen;
  }

  async update(id: number, updateScreenDto: UpdateScreenDto): Promise<Screen> {
    // preload sẽ lấy entity cũ và gộp (merge) với dữ liệu mới
    const screen = await this.screenRepository.preload({
      id: id,
      ...updateScreenDto,
    });
    if (!screen) {
      throw new NotFoundException(`Screen with ID "${id}" not found`);
    }
    return this.screenRepository.save(screen);
  }

  async remove(id: number): Promise<void> {
    const result = await this.screenRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Screen with ID "${id}" not found`);
    }
  }
} 