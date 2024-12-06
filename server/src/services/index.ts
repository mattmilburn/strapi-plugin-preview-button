import config, { type ConfigService } from './config';

export interface PreviewButtonServices {
  config: ConfigService;
}

export default {
  config,
};
