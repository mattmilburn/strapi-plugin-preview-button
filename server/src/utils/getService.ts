import { PLUGIN_ID } from '../constants';
import { type PreviewButtonServices } from '../services';

const getService = <TName extends keyof PreviewButtonServices>(
  name: TName
): PreviewButtonServices[TName] =>
  global.strapi.plugin(PLUGIN_ID).service<PreviewButtonServices[TName]>(name);

export default getService;
