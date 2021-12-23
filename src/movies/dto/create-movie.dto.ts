import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  backdrop_path: string;

  @IsString()
  @IsNotEmpty()
  genres: string;

  @IsString()
  @IsNotEmpty()
  homepage: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  imdb_id: string;

  @IsString()
  @IsNotEmpty()
  original_language: string;

  @IsString()
  @IsNotEmpty()
  original_title: string;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsNotEmpty()
  poster_path: string | null;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsNumber()
  @IsNotEmpty()
  runtime: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
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
