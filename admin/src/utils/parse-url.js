import qs from 'qs';

import interpolate from './interpolate';
import trimSlashes from './trim-slashes';

const parseUrl = (config, data) => {
  if (!config || !data) {
    return null;
  }

  const supportedTypes = ['number', 'string'];
  const replacements = Object.entries(data).reduce((acc, [key, val]) => {
    if (!supportedTypes.includes(typeof val)) {
      return acc;
    }

    return {
      ...acc,
      [key]: val,
    };
  }, {});
  const params = Object.entries(config?.query ?? {}).reduce((acc, [key, val]) => {
    return {
      ...acc,
      [key]: encodeURIComponent(interpolate(val, replacements)),
    };
  }, {});

  const url = encodeURI(interpolate(trimSlashes(config.url), replacements));
  const query = qs.stringify(params, {
    addQueryPrefix: true,

    /**
     * @NOTE - Disabling the `encoding` option here because we are already
     * handling it in `replacements` and for some reason, tests are failing
     * because qs mistakenly double-encodes params, but only during tests.
     */
    encode: false,
  });

  return `${url}${query}`;
};

export default parseUrl;
