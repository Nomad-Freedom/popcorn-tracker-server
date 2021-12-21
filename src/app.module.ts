import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.status.${process.env.STATUS}`,
      validationSchema: configValidationSchema,
    }),
    MoviesModule,
  ],
})
export class AppModule {}
