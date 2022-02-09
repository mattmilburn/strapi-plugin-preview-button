'use strict';

module.exports = {
  default: {
    contentTypes: [],
  },
  validator: config => {
    if ( ! Array.isArray( config.contentTypes ) ) {
      throw new Error( 'In preview-button plugin config, contentTypes must be an array' );
    }
  },
};
