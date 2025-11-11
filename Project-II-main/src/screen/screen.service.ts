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
    private readonly screenRepo: Repository<Screen>,
  ) {}

  async create(dto: CreateScreenDto): Promise<Screen> {
    const entity = this.screenRepo.create(dto);
    return this.screenRepo.save(entity);
  }

  async findAll(): Promise<Screen[]> {
    return this.screenRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Screen> {
    const entity = await this.screenRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Screen ${id} not found`);
    return entity;
  }

  async update(id: number, dto: UpdateScreenDto): Promise<Screen> {
    const entity = await this.screenRepo.preload({ id, ...dto });
    if (!entity) throw new NotFoundException(`Screen ${id} not found`);
    return this.screenRepo.save(entity);
  }

  async remove(id: number): Promise<{ success: true }> {
    const res = await this.screenRepo.delete(id);
    if (!res.affected) throw new NotFoundException(`Screen ${id} not found`);
    return { success: true };
  }
}
