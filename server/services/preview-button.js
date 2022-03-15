'use strict';

const qs = require( 'qs' );

const config = require( '../config' );
const { pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async getConfig() {
    const data = await strapi.config.get( `plugin.${pluginId}`, config.default );

    return data;
  },

  getPreviewUrls( entity, contentType ) {
    const { uid, targetField, draft, published } = contentType;
    const secret = process.env.STRAPI_PREVIEW_SECRET;
    let publishedUrl = process.env.STRAPI_PREVIEW_PUBLISHED_URL.replace( /\/$/, '' );
    let draftUrl = process.env.STRAPI_PREVIEW_DRAFT_URL.replace( /\/$/, '' );
    let draftParams = {
      secret,
      [ targetField ]: entity[ targetField ],
    };

    // Maybe append optional `query` string values to draft urls.
    if ( draft && draft.query ) {
      draftParams = {
        ...draft.query,
        ...draftParams,
      };
    }

    // Maybe append optional `basePath` value to published urls.
    if ( published && published.basePath ) {
      publishedUrl = `${publishedUrl}/${published.basePath}`;
    }

    draftUrl = `${draftUrl}?${qs.stringify( draftParams )}`;
    // Remove entity targetField if is a SingleType
    publishedUrl = entity[ targetField ] ? `${publishedUrl}/${entity[ targetField ]}` : `${publishedUrl}`;

    return {
      draftUrl,
      publishedUrl,
    };
  },
} );
