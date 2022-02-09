import pluginId from '../pluginId';
import main from './main';
import config from './config';

const reducers = {
  [ pluginId ]: main,
  [ `${pluginId}_config` ]: config,
};

export default reducers;
