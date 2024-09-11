import { PreviewButtonStateConfig } from '../../../server/src/config';
import { PREVIEW_WINDOW_NAME } from '../constants';
import parseUrl from './parseUrl';

export const defaultRequiredConfig = {
  copy: true,
  openTarget: PREVIEW_WINDOW_NAME,
  url: '',
};

const getPublishStateConfig = (
  config: PreviewButtonStateConfig,
  data: any
): PreviewButtonStateConfig => ({
  ...defaultRequiredConfig,
  ...config,
  url: parseUrl(config, data),
});

export default getPublishStateConfig;
