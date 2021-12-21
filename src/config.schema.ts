import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  TMDB_URL_SEARCH_MOVIES: Joi.string().required(),
  TMDB_URL_MOVIE: Joi.string().required(),
  TMDB_API_KEY: Joi.string().required(),
});
