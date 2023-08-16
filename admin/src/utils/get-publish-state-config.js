import { PREVIEW_WINDOW_NAME } from '../constants';
import parseUrl from './parse-url';

export const defaultRequiredConfig = {
  copy: true,
  openTarget: PREVIEW_WINDOW_NAME,
};

const getPublishStateConfig = (config, data) => {
  const url = parseUrl(config, data);

  if (!url) {
    return null;
  }

  return {
    ...defaultRequiredConfig,
    ...config,
    url,
  };
};

export default getPublishStateConfig;
