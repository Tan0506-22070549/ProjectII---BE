import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({ status: 201, description: 'Movie created successfully.' })
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'List of all movies.' })
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie found.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update movie details' })
  @ApiResponse({ status: 200, description: 'Movie updated successfully.' })
  update(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.movieService.update(Number(id), body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.movieService.remove(Number(id));
  }
}

