import { PLUGIN_ID } from '../constants';
import config from './config';

const reducers = {
  [`${PLUGIN_ID}_config`]: config,
};

export default reducers;
