'use strict';

const { getService, pluginId } = require( '../utils' );

module.exports = {
  async config( ctx ) {
    const config = await getService( 'plugin' ).getConfig();

    ctx.send( config );
  },

  async findOne( ctx ) {
    const { uid, id } = ctx.request.params;

    const { contentTypes, requireDraftSecret } = await getService( 'plugin' ).getConfig();
    const supportedType = contentTypes.find( type => type.uid === uid );

    // Return empty object if UID type is not supported.
    if ( ! supportedType ) {
      return ctx.send( {} );
    }

    // Not sure if this is expected behavior, but using `find()` with single types
    // seem to always return null when they are either in draft state or if they
    // have `draftAndPublish` disabled entirely. To work around that, we use
    // specific params here to find the single entity in either state.
    const params = { publicationState: 'preview' };
    const entity = id
      ? await strapi.service( uid ).findOne( id, params )
      : await strapi.service( uid ).find( params );

    // Entity not found.
    if ( ! entity ) {
      return ctx.notFound();
    }

    const urls = getService( 'preview-button' ).getPreviewUrls(
      entity,
      supportedType,
      requireDraftSecret
    );

    // Return preview URLs.
    ctx.send( { data: urls } );
  },
};
