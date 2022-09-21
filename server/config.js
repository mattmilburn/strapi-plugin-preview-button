'use strict';

const { ValidationError } = require('@strapi/utils').errors;
const { has } = require( 'lodash' );

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

    // Validate each content type object.
    config.contentTypes.forEach( entry => {
      // Required `uid` prop.
      if ( ! entry.uid ) {
        throw new ValidationError( `Missing uid for ${entry.uid}.` );
      }

      // Required `url` props.
      if ( ! has( entry, 'draft.url' ) ) {
        throw new ValidationError( `Missing draft URL for ${entry.uid}.` );
      }

      if ( ! has( entry, 'published.url' ) ) {
        throw new ValidationError( `Missing published URL for ${entry.uid}.` );
      }
    } );
  },
};
