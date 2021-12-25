import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async saveMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.create(createMovieDto);

    const result = await this.findOne(movie.id).catch((_error) => {
      throw new InternalServerErrorException();
    });

    if (result) {
      return movie;
    }
    await this.save(movie);
    return movie;
  }

  async findMovie(id: number): Promise<Movie> {
    const movie = await this.findOne(id).catch((_error) => {
      throw new InternalServerErrorException();
    });
    if (!movie) {
      throw new NotFoundException(`movie with id:${id} cannot be found`);
    }
    return movie;
  }
}
