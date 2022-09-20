'use strict';

const { ValidationError } = require('@strapi/utils').errors;

const { pluginId } = require( './utils' );

module.exports = {
  default: {
    contentTypes: [],
    requireSecret: true,
  },
  validator: config => {
    if ( ! config.contentTypes ) {
      return;
    }

    let requiredEnvVars = [
      process.env.STRAPI_PREVIEW_DRAFT_URL,
      process.env.STRAPI_PREVIEW_PUBLISHED_URL,
    ];

    // Maybe require the env SECRET.
    if ( config.requireSecret ) {
      requiredEnvVars.push( process.env.STRAPI_PREVIEW_SECRET );
    }

    // Ensure env vars are set.
    if ( ! requiredEnvVars.every( val => val ) ) {
      throw new ValidationError( `Must define required environment variables for the ${pluginId} plugin.` );
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
    } );
  },
};
