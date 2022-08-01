'use strict';

const { get } = require( 'lodash' );
const qs = require( 'qs' );

const config = require( '../config' );
const { buildUrl } = require( '../utils' );

module.exports = ( { strapi } ) => ( {
  getPreviewUrls( entity, contentTypeConfig ) {
    const { uid, targetField, draft, published } = contentTypeConfig;

    // If `targetField` is defined in either `draft` or `publish`, prioritize those
    // props over the top-level `targetField`.
    const draftTargetField = get( draft, 'targetField', targetField );
    const publishedTargetField = get( published, 'targetField', targetField );
    const draftTargetFieldValue = get( entity, draftTargetField, null );
    const publishedTargetFieldValue = get( entity, publishedTargetField, null );

    // Prepare draft and published URL parts.
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
