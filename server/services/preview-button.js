'use strict';

const qs = require( 'qs' );

const config = require( '../config' );
const { pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async getConfig() {
    const data = await strapi.config.get( `plugin.${pluginId}`, config.default );

    return data;
  },

  getPreviewUrls( entity, contentType, targetField ) {
    const secret = process.env.STRAPI_PREVIEW_SECRET;
    let publishedUrl = process.env.STRAPI_PREVIEW_PUBLISHED_URL.replace( /\/$/, '' );
    let draftUrl = process.env.STRAPI_PREVIEW_DRAFT_URL.replace( /\/$/, '' );
    let draftParams = {
      secret,
      [ targetField ]: entity[ targetField ],
    };

    // Maybe apply specific settings from contentType object.
    if ( typeof contentType !== 'string' ) {
      const { draft, published } = contentType;

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
    publishedUrl = `${publishedUrl}/${entity[ targetField ]}`;

    return {
      draftUrl,
      publishedUrl,
    };
  },
} );
