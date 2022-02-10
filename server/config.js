'use strict';

const { ValidationError } = require('@strapi/utils').errors;

const { pluginId } = require( './utils' );

module.exports = {
  default: {
    contentTypes: [],
  },
  validator: config => {
    // Ensure `contentTypes` is an array.
    if ( ! Array.isArray( config.contentTypes ) ) {
      throw new ValidationError( `In ${pluginId} plugin config, contentTypes must be an array.` );
      return;
    }

    const entriesMatchFormat = config.contentTypes.every( entry => {
      return !! entry.uid && !! entry.targetField;
    } );

    // Ensure entries in `contentTypes` define `uid` and `targetField`.
    if ( ! entriesMatchFormat ) {
      throw new ValidationError( `In ${pluginId} plugin config, entries in contentTypes must define a uid and targetField.` );
      return;
    }
  },
};
