import type { Core } from '@strapi/strapi';

import { defaultConfig } from '../config';
import type { PreviewButtonPluginConfig } from '../config';
import { PLUGIN_ID } from '../constants';

export type ConfigService = ReturnType<typeof configService>;

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get(): Promise<PreviewButtonPluginConfig> {
    const config = await strapi.config.get(`plugin::${PLUGIN_ID}`, defaultConfig);

    return config;
  },
});

export default configService;
