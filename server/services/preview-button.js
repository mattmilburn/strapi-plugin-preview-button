'use strict';

const qs = require( 'qs' );

const config = require( '../config' );
const { pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async getConfig() {
    const data = await strapi.config.get( `plugin.${pluginId}`, config.default );

    return data;
  },

  getPreviewUrls( entity, config ) {
    const secret = process.env.STRAPI_PREVIEW_SECRET;
    let publishedUrl = process.env.STRAPI_PREVIEW_PUBLISHED_URL.replace( /\/$/, '' );
    let draftUrl = process.env.STRAPI_PREVIEW_DRAFT_URL.replace( /\/$/, '' );
    let draftParams = {
      secret,
      slug: entity.slug,
    };

    // Maybe apply specific settings from config object.
    if ( typeof config !== 'string' ) {
      const { draft, published } = config;

      // Append optional `query` string values to draft urls.
      if ( draft && draft.query ) {
        draftParams = {
          ...draft.query,
          ...draftParams,
        };
      }

      // Append optional `basePath` value to published urls.
      if ( published && published.basePath ) {
        publishedUrl = `${publishedUrl}/${published.basePath}`;
      }
    }

    draftUrl = `${draftUrl}?${qs.stringify( draftParams )}`;
    publishedUrl = `${publishedUrl}/${entity.slug}`;

    return {
      draftUrl,
      publishedUrl,
    };
  },
} );
