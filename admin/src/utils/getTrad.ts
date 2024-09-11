import pluginId from './pluginId';

const getTrad = (id: number | string): string => `${pluginId}.${id}`;

export default getTrad;
