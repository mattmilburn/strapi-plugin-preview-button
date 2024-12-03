import { PLUGIN_ID } from '../constants';

type TradOptions = Record<string, string>;

const prefixPluginTranslations = (trad: TradOptions): TradOptions => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${PLUGIN_ID}.${current}`] = trad[current];

    return acc;
  }, {} as TradOptions);
};

export default prefixPluginTranslations;
