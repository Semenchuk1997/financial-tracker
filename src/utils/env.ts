import * as Joi from 'joi';
import { SchemaMap } from 'joi';

export function validateEnv<TSchema>(
  schema: SchemaMap<TSchema, true>,
): TSchema {
  const { error, value } = Joi.object(schema).validate(process.env, {
    allowUnknown: true,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return value;
}
