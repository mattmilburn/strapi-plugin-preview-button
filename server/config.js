'use strict';

const { ValidationError } = require('@strapi/utils').errors;

const { pluginId } = require( './utils' );

module.exports = {
  default: {
    contentTypes: [],
  },
  validator: config => {
    if ( ! config.contentTypes ) {
      return;
    }

    // Ensure `contentTypes` is an array.
    if ( ! Array.isArray( config.contentTypes ) ) {
      throw new ValidationError( `Must define contentTypes as an array.` );
    }

    // Validate each content type.
    config.contentTypes.forEach( entry => {
      // Required `uid` prop.
      if ( ! entry.uid ) {
        throw new ValidationError( `Missing uid for ${entry.uid}.` );
      }

      // Required `targetField` prop.
      if ( ! entry.targetField ) {
        throw new ValidationError( `Missing targetField for ${entry.uid}.` );
      }

      const schema = strapi.getModel( entry.uid );

      // Check for existing schema.
      if ( ! schema ) {
        throw new ValidationError( `Unable to find schema for ${entry.uid}.` );
      }
    } );
  },
};
