import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  MovieDetails,
  MovieDetailsResponse,
  MovieTrailer,
} from './interfaces/movie-details.interface';
import { MoviesError } from './interfaces/movies-error.interface';
import {
  MoviesSearch,
  Result,
  ResultMin,
} from './interfaces/movies-search.interface';

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
      const newResult: ResultMin[] = this.modifyMoviesResult(
        data.results as Result[],
      );

      return { ...data, results: newResult };
    } catch (error) {
      this.errorHandler(error as MoviesError);
    }
  }

  // find movie from tmdb by Id and returns movie details
  async findMovieById(id: number): Promise<MovieDetailsResponse> {
    const axiosConfig = {
      params: {
        api_key: this.API_KEY,
        language: 'en-US',
      },
    };
    try {
      const resultTrailers = axios.get<MovieTrailer>(
        `${this.MOVIE_TRAILER_URL}${id}/videos`, // https://api.themoviedb.org/3/movie/{id}/videos
        axiosConfig,
      );
      const resultDetails = axios.get<MovieDetails>(
        `${this.MOVIE_TRAILER_URL}${id}`,
        axiosConfig,
      );

      const [{ data: movieTrailers }, { data: movieDetails }] =
        await Promise.all([resultTrailers, resultDetails]);

      const trailer = `https://www.youtube.com/watch?v=${
        movieTrailers.results.find(
          (trailer) => trailer.type.toLowerCase() === 'trailer',
        ).key
      }`;
      return {
        backdrop_path: `${this.IMAGE_URL}${movieDetails.backdrop_path}`,
        genres: movieDetails.genres,
        homepage: movieDetails.homepage,
        id: movieDetails.id,
        imdb_id: movieDetails.imdb_id,
        original_language: movieDetails.original_language,
        original_title: movieDetails.original_title,
        overview: movieDetails.overview,
        poster_path: `${this.IMAGE_URL}${movieDetails.poster_path}`,
        release_date: movieDetails.release_date,
        runtime: movieDetails.runtime,
        status: movieDetails.status,
        tagline: movieDetails.tagline,
        title: movieDetails.title,
        video: trailer,
        vote_average: movieDetails.vote_average,
        vote_count: movieDetails.vote_count,
      };
    } catch (error) {
      this.errorHandler(error as MoviesError);
    }
  }

  private modifyMoviesResult(results: Result[]): ResultMin[] {
    return results.map((movie) => ({
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: `${this.IMAGE_URL}${movie.poster_path}`,
      release_date: movie.release_date,
      title: movie.title,
    }));
  }

  private errorHandler(error: MoviesError): void {
    if (error.status_code === 34) {
      throw new NotFoundException(error.status_message);
    }
    throw new InternalServerErrorException();
  }
}
