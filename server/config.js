'use strict';

const { pluginId } = require( './utils' );

module.exports = {
  default: {
    contentTypes: [],
  },
  validator: config => {
    if ( ! Array.isArray( config.contentTypes ) ) {
      throw new Error( `In ${pluginId} plugin config, contentTypes must be an array` );
    }
  },
};
