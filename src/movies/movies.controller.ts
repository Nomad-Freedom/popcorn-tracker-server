import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesSearch } from './interfaces/movies-search.interface';
import { QueryMoviesDto } from './dto/query-movies.dto';
import { MovieDetailsResponse } from './interfaces/movie-details.interface';
import { Movie } from './entities/movie.entity';
import { FilterMoviesDto } from './dto/filter-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() filterMovieDto: FilterMoviesDto): Promise<Movie[]> {
    return this.moviesService.findAll(filterMovieDto);
  }
  @Get('/search')
  search(@Query() queryMoviesDto: QueryMoviesDto): Promise<MoviesSearch> {
    return this.moviesService.search(queryMoviesDto);
  }

  @Get('/search/:id')
  searchOne(@Param('id') id: string): Promise<MovieDetailsResponse> {
    return this.moviesService.searchOne(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id/watched')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(+id);
  }
}
