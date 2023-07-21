import { pluginId } from '../utils';
import config from './config';

const reducers = {
  [`${pluginId}_config`]: config,
};

export default reducers;
