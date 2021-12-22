import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MovieDetails } from './interfaces/movie-details.interface';
import { MoviesSearch, ResultMin } from './interfaces/movies-search.interface';

@Injectable()
export class MoviesHttpService {
  private SEARCH_URL: string;
  private MOVIE_TRAILER_URL: string;
  private API_KEY: string;
  private IMAGE_URL: string;

  constructor(private configService: ConfigService) {
    this.SEARCH_URL = this.configService.get('TMDB_URL_SEARCH_MOVIES');
    this.MOVIE_TRAILER_URL = this.configService.get('TMDB_URL_MOVIE');
    this.API_KEY = this.configService.get('TMDB_API_KEY');
    this.IMAGE_URL = this.configService.get('TMDB_URL_IMAGES');
  }

  async findMovies(query: string): Promise<MoviesSearch> {
    try {
      // get movies from tmdb api from query
      const { data } = await axios.get<MoviesSearch>(this.SEARCH_URL, {
        params: {
          api_key: this.API_KEY,
          language: 'en-US',
          query: query,
          page: 1,
          include_adult: false,
        },
      });
      //add proper image url to images and minimize results movie object
      const newResult: ResultMin[] = data.results.map((movie) => ({
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: `${this.IMAGE_URL}${movie.poster_path}`,
        release_date: movie.release_date,
        title: movie.title,
      }));

      return { ...data, results: newResult };
    } catch (error) {
      if (error.status_code === 34) {
        throw new NotFoundException(error.status_message);
      }
      throw new InternalServerErrorException();
    }
  }

  // find movie from tmdb by Id and returns movie details
  async findMovieById(id: number): Promise<MovieDetails> {
    try {
      const { data } = await axios.get<MovieDetails>(
        `${this.MOVIE_TRAILER_URL}${id}`,
        {
          params: {
            api_key: this.API_KEY,
            language: 'en-US',
          },
        },
      );
      return data;
    } catch (error) {
      // if movie was not found
      if (error.status_code === 34) {
        throw new NotFoundException(error.status_message);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
