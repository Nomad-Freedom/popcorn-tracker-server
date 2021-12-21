import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  TMDB_URL_SEARCH_MOVIES: Joi.string().required(),
  TMDB_URL_MOVIE: Joi.string().required(),
  TMDB_API_KEY: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
