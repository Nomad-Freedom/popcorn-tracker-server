import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsBoolean()
  watched: boolean;
}
