import { type Core } from '@strapi/strapi';

import { PLUGIN_ID } from './constants';
import { getService } from './utils';

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  const config = await getService('config').get();

  if (!Array.isArray(config?.contentTypes)) {
    return;
  }

  // Enable the list view column by default unless explicitly disabled.
  config.contentTypes.forEach(({ uid }) => {
    const contentType = strapi.contentTypes?.[uid];

    if (!contentType) {
      return;
    }

    const options = (contentType.pluginOptions?.[PLUGIN_ID] ?? {}) as Record<string, any>;

    contentType.pluginOptions = {
      ...contentType.pluginOptions,
      [PLUGIN_ID]: { ...options, listViewColumn: options.listViewColumn ?? true },
    };
  });
};

export default bootstrap;
