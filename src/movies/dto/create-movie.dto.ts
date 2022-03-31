import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  backdrop_path: string;

  @IsString()
  @IsNotEmpty()
  genres: string;

  @IsString()
  homepage: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  imdb_id: string;

  @IsString()
  @IsNotEmpty()
  original_language: string;

  @IsString()
  @IsNotEmpty()
  original_title: string;

  @IsString()
  overview: string;

  @IsNotEmpty()
  poster_path: string | null;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsNumber()
  runtime: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  tagline: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  video: string;

  @IsNumber()
  @IsNotEmpty()
  vote_average: number;

  @IsNumber()
  @IsNotEmpty()
  vote_count: number;

  @IsNotEmpty()
  @IsBoolean()
  watched: boolean;
}
