import { type Core } from '@strapi/strapi';

import { defaultConfig, type PreviewButtonPluginConfig } from '../config';
import { pluginId } from '../utils';

type ConfigService = ReturnType<typeof configService>;

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get(): Promise<PreviewButtonPluginConfig> {
    const config = await strapi.config.get(`plugin::${pluginId}`, defaultConfig);

    return config;
  },
});

export { type ConfigService };
export default configService;
