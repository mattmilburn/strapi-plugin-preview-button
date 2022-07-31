'use strict';

const { get } = require( 'lodash' );
const qs = require( 'qs' );

const config = require( '../config' );
const { buildUrl, pluginId } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  async getConfig() {
    const data = await strapi.config.get( `plugin.${pluginId}`, config.default );

    return data;
  },

  getPreviewUrls( entity, contentType ) {
    const { uid, targetField, draft, published } = contentType;

    const draftTargetField = get( draft, 'targetField', null );
    const publishedTargetField = get( published, 'targetField', null );
    const draftTargetFieldValue = get( entity, draftTargetField, targetField );
    const publishedTargetFieldValue = get( entity, publishedTargetField, targetField );

    const publishedBasePath = get( published, 'basePath', null );
    const publishedQuery = get( published, 'query', {} );
    const draftBasePath = get( draft, 'basePath', null );
    let draftQuery = get( draft, 'query', {} );

    // Include the required `secret` into the draft query params.
    draftQuery.secret = process.env.STRAPI_PREVIEW_SECRET;

    // Optionally include the `targetField` value in the draft query params.
    // Only collection types truly require the `targetField`, while single types
    // can optionally use the `basePath` to help build the desired URL.
    if ( draftTargetField && draftTargetFieldValue ) {
      draftQuery[ draftTargetField ] = draftTargetFieldValue;
    }

    // Build final URLs.
    const draftUrl = buildUrl(
      process.env.STRAPI_PREVIEW_DRAFT_URL,
      draftBasePath,
      null,
      draftQuery
    );

    const publishedUrl = buildUrl(
      process.env.STRAPI_PREVIEW_PUBLISHED_URL,
      publishedBasePath,
      publishedTargetFieldValue,
      publishedQuery
    );

    return {
      draftUrl,
      publishedUrl,
    };
  },
} );
