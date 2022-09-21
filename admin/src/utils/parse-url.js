import qs from 'qs';

import interpolate from './interpolate';
import trimSlashes from './trim-slashes';

const parseUrl = ( config, data ) => {
  const supportedTypes = [ 'number', 'string' ];
  const props = Object.entries( data ).reduce( ( acc, [ key, val ] ) => {
    if ( ! supportedTypes.includes( typeof val ) ) {
      return acc;
    }

    return {
      ...acc,
      [ key ]: val,
    };
  }, {} );

  const url = interpolate( trimSlashes( config.url ), props );
  const query = qs.stringify( config.query, { addQueryPrefix: true } );

  return `${url}${query}`;
};

export default parseUrl;
