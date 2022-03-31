import { IsBooleanString } from 'class-validator';

export class FilterMoviesDto {
  @IsBooleanString()
  watched: boolean;
}
