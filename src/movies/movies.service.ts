import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterMoviesDto } from './dto/filter-movies.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import {
  MovieDetails,
  MovieDetailsResponse,
} from './interfaces/movie-details.interface';
import { MoviesSearch } from './interfaces/movies-search.interface';
import { MoviesHttpService } from './movies-http.service';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    private moviesHttpService: MoviesHttpService,
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}
  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesRepository.saveMovie(createMovieDto);
  }

  search(queryMoviesDto: QueryMoviesDto): Promise<MoviesSearch> {
    const { query } = queryMoviesDto;
    return this.moviesHttpService.findMovies(query);
  }

  searchOne(id: number): Promise<MovieDetailsResponse> {
    return this.moviesHttpService.findMovieById(id);
  }

  async findAll(filterMovieDto: FilterMoviesDto): Promise<Movie[]> {
    try {
      const movies = await this.moviesRepository.find({
        order: { release_date: 'DESC' },
        where: { watched: filterMovieDto.watched },
      });
      return movies;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findMovie(id);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { watched } = updateMovieDto;
    const movie = await this.moviesRepository.findMovie(id);

    movie.watched = watched;
    await this.moviesRepository.save(movie).catch((_error) => {
      throw new InternalServerErrorException();
    });
    return movie;
  }

  async remove(id: number): Promise<void> {
    const result = await this.moviesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`movie with id:${id} cannot be found`);
    }
  }
}
