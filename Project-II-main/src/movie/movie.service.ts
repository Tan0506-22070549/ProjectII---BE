import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './dto/entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  create(dto: CreateMovieDto) {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
  }

  findAll() {
    return this.movieRepo.find();
  }

  findOne(id: number) {
    return this.movieRepo.findOneBy({ id });
  }

  update(id: number, dto: UpdateMovieDto) {
    return this.movieRepo.update(id, dto);
  }

  remove(id: number) {
    return this.movieRepo.delete(id);
  }
}
