import { registerAs } from '@nestjs/config';
import { validateEnv } from '../utils/env';
import * as Joi from 'joi';
import { ClientOptions as NotionOptions } from '@notionhq/client/build/src/Client';

export const notionConfig = registerAs('notion', (): NotionOptions => {
  const envs = validateEnv<{
    NOTION_KEY: string;
  }>({
    NOTION_KEY: Joi.string().required(),
  });

  return {
    auth: envs.NOTION_KEY,
  };
});
