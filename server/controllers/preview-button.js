'use strict';

const { getService, pluginId } = require( '../utils' );

module.exports = {
  async config( ctx ) {
    const { contentTypes } = await getService( 'plugin' ).getConfig();

    const config = {
      contentTypes: contentTypes.map( type => type.uid ),
    };

    ctx.send( { config } );
  },

  async findOne( ctx ) {
    const { uid, id } = ctx.request.params;

    const hasEnvVars = [
      process.env.STRAPI_PREVIEW_SECRET,
      process.env.STRAPI_PREVIEW_DRAFT_URL,
      process.env.STRAPI_PREVIEW_PUBLISHED_URL,
    ].every( val => val );

    const { contentTypes } = await getService( 'plugin' ).getConfig();
    const supportedType = contentTypes.find( type => type.uid === uid );

    // Collection types will find by the ID and single types do not.
    const findParams = id ? { filters: { id } } : {};
    const entity = await strapi.entityService.findOne( uid, findParams );

    // Raise warning if plugin is active but not properly configured with required env vars.
    if ( ! hasEnvVars ) {
      console.warn( `Environment variables required for ${pluginId} plugin must be defined before it can be used.` );
    }

    // Return empty object if requirements are not met.
    if ( ! hasEnvVars || ! supportedType || ! entity ) {
      return ctx.send( {} );
    }

    const urls = getService( 'preview-button' ).getPreviewUrls( entity, supportedType );

    // Return preview URLs.
    ctx.send( { urls } );
  },
};
