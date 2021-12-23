import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @Column()
  backdrop_path: string;

  @Column()
  genres: string;

  @Column()
  homepage: string;

  @PrimaryColumn()
  id: number;

  @Column()
  imdb_id: string;

  @Column()
  original_language: string;

  @Column()
  original_title: string;

  @Column('text')
  overview: string;

  @Column({ nullable: true })
  poster_path: string;

  @Column()
  release_date: string;

  @Column()
  runtime: number;

  @Column()
  status: string;

  @Column()
  tagline: string;

  @Column()
  title: string;

  @Column()
  video: string;

  @Column()
  vote_average: number;

  @Column()
  vote_count: number;

  @Column()
  watched: boolean;
}
