import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiPropertyOptional({ example: 'New title', description: 'Updated movie title' })
  title?: string;
}
