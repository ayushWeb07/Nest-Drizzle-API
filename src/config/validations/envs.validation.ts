import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'testing'),
  SERVER_PORT: Joi.number().required().port(),
  API_VERSION: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
});
