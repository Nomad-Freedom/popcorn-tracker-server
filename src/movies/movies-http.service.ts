import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  MoviesSearch,
  MoviesSearchError,
} from './interfaces/movies-search.interface';

@Injectable()
export class MoviesHttpService {
  private SEARCH_URL: string;
  private MOVIE_TRAILER_URL: string;
  private API_KEY: string;
  constructor(private configService: ConfigService) {
    this.SEARCH_URL = this.configService.get('TMDB_URL_SEARCH_MOVIES');
    this.MOVIE_TRAILER_URL = this.configService.get('TMDB_URL_MOVIE');
    this.API_KEY = this.configService.get('TMDB_API_KEY');
  }

  async findMovies(query: string): Promise<MoviesSearch> {
    try {
      const { data } = await axios.get<MoviesSearch>(this.SEARCH_URL, {
        params: {
          api_key: this.API_KEY,
          language: 'en-US',
          query: query,
          page: 1,
          include_adult: false,
        },
      });
      return data;
    } catch (error) {
      const moviesError: MoviesSearchError = error;
      if (moviesError.status_code === 34) {
        throw new NotFoundException(moviesError.status_message);
      }
      throw new InternalServerErrorException();
    }
  }
}
