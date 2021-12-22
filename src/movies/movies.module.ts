import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { MoviesHttpService } from './movies-http.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesRepository]), ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesHttpService],
})
export class MoviesModule {}
