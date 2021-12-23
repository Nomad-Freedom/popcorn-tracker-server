import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  MovieDetails,
  MovieDetailsResponse,
} from './interfaces/movie-details.interface';
import { MoviesSearch } from './interfaces/movies-search.interface';
import { MoviesHttpService } from './movies-http.service';

@Injectable()
export class MoviesService {
  constructor(private moviesHttpService: MoviesHttpService) {}
  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  search(queryMoviesDto: QueryMoviesDto): Promise<MoviesSearch> {
    const { query } = queryMoviesDto;
    return this.moviesHttpService.findMovies(query);
  }

  searchOne(id: number): Promise<MovieDetailsResponse> {
    return this.moviesHttpService.findMovieById(id);
  }

  async findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
