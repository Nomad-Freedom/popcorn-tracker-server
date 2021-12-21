import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {}
