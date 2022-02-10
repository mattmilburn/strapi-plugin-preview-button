'use strict';

const { getService } = require( '../utils' );

module.exports = {
  async findOne( ctx ) {
    const { uid, id } = ctx.request.params;

    const hasEnvVars = [
      process.env.STRAPI_PREVIEW_SECRET,
      process.env.STRAPI_PREVIEW_DRAFT_URL,
      process.env.STRAPI_PREVIEW_PUBLISHED_URL,
    ].every( val => val );

    const pluginService = await getService( 'preview-button' );
    const { contentTypes } = await pluginService.getConfig();
    const supportedType = contentTypes.find( type => type === uid || type.uid === uid );
    const isSupported = hasEnvVars && !! supportedType;

    // Do nothing if this UID is not supported in the plugin config or if the
    // required environment variables are not set.
    if ( ! isSupported ) {
      ctx.send( {} );
      return;
    }

    const entity = await strapi.query( uid ).findOne( {
      where: { id },
    } );

    if ( ! entity ) {
      ctx.send( {} );
      return;
    }

    const urls = pluginService.getPreviewUrls( entity, supportedType );

    // Return preview URLs.
    ctx.send( { urls } );
  },

  async getUIDs( ctx ) {
    const { contentTypes } = await getService( 'preview-button' ).getConfig();
    const uids = contentTypes.map( type => typeof type === 'string' ? type : type.uid );

    ctx.send( uids );
  },
};
