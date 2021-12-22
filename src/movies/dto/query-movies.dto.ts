import { IsNotEmpty, IsString } from 'class-validator';

export class QueryMoviesDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
