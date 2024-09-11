import pluginId from './pluginId';

import { type PreviewButtonServices } from 'src/services';

const getService = <TName extends keyof PreviewButtonServices>(name: TName): PreviewButtonServices[TName] =>
  global.strapi.plugin(pluginId).service<PreviewButtonServices[TName]>(name);

export default getService;
