import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Seat } from './seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { QuerySeatDto } from './dto/query-seat.dto';
import { BulkGenerateDto } from './dto/bulk-generate.dto';
import { BulkUpdateStatusDto } from './dto/bulk-update-status.dto';

@Injectable()
export class SeatsService {
  constructor(@InjectRepository(Seat) private readonly repo: Repository<Seat>) {}

  async create(dto: CreateSeatDto) {
    await this.ensureUnique(dto.screenId, dto.row, dto.col, dto.label);
    const seat = this.repo.create(dto);
    return this.repo.save(seat);
  }

  async findById(id: string) {
    const seat = await this.repo.findOne({ where: { id } });
    if (!seat) throw new NotFoundException('Seat not found');
    return seat;
  }

  async findAll(q: QuerySeatDto) {
    const where: any = { screenId: q.screenId };
    if (q.type) where.type = q.type;
    if (q.status) where.status = q.status;
    if (q.row) where.row = q.row;

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { row: 'ASC', col: 'ASC' },
      skip: q.skip ?? 0,
      take: q.take ?? 200,
    });
    return { items, total };
  }

  async update(id: string, dto: UpdateSeatDto) {
    const seat = await this.findById(id);
    const row = dto.row ?? seat.row;
    const col = dto.col ?? seat.col;
    const label = dto.label ?? seat.label;

    if (row !== seat.row || col !== seat.col || label !== seat.label) {
      await this.ensureUnique(seat.screenId, row, col, label, seat.id);
    }

    Object.assign(seat, dto, { row, col, label });
    return this.repo.save(seat);
  }

  async remove(id: string) {
    await this.repo.softDelete(id);
    return { success: true };
  }

  async bulkGenerate(dto: BulkGenerateDto) {
    const rows = this.expandRows(dto.rowStart, dto.rowEnd);
    const entities: Seat[] = [];

    for (const r of rows) {
      for (let c = 1; c <= dto.cols; c++) {
        const label = `${r}${c}`;
        entities.push(this.repo.create({
          screenId: dto.screenId,
          row: r,
          col: c,
          label,
          type: dto.defaultType ?? undefined,
          priceMultiplier: dto.defaultMultiplier ?? undefined,
        }));
      }
    }

    await this.repo
      .createQueryBuilder()
      .insert()
      .into(Seat)
      .values(entities)
      .orIgnore() // MySQL: bỏ qua nếu đã tồn tại
      .execute();

    return this.findAll({ screenId: dto.screenId });
  }

  async bulkUpdateStatus(dto: BulkUpdateStatusDto) {
    await this.repo.update({ id: In(dto.seatIds), screenId: dto.screenId }, { status: dto.status });
    return this.findAll({ screenId: dto.screenId });
  }

  // Helpers
  private async ensureUnique(screenId: string, row: string, col: number, label: string, ignoreId?: string) {
    const exists = await this.repo.findOne({
      where: [
        { screenId, row, col },
        { screenId, label },
      ],
      withDeleted: false,
    });

    if (exists && exists.id !== ignoreId) {
      throw new ConflictException('Seat with same position or label already exists in this screen');
    }
  }

  private expandRows(start: string, end: string) {
    const a = start.trim().toUpperCase().charCodeAt(0);
    const b = end.trim().toUpperCase().charCodeAt(0);
    const from = Math.min(a, b);
    const to = Math.max(a, b);
    const arr: string[] = [];
    for (let i = from; i <= to; i++) arr.push(String.fromCharCode(i));
    return arr;
  }
}
