import { PLUGIN_ID } from '../constants';

const getTrad = (id: number | string): string => `${PLUGIN_ID}.${id}`;

export default getTrad;
