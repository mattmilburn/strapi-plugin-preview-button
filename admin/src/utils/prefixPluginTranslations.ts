import pluginId from './pluginId';

type TradOptions = Record<string, string>;

const prefixPluginTranslations = (trad: TradOptions): TradOptions => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];

    return acc;
  }, {} as TradOptions);
};

export default prefixPluginTranslations;