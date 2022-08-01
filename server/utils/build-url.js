'use strict';

const qs = require( 'qs' );

const trimSlashes = require( './trim-slashes' );

const buildUrl = ( baseUrl, basePath, slug, params ) => {
  const sanitizedBaseUrl = baseUrl ? trimSlashes( baseUrl ) : null;
  const sanitizedBasePath = basePath ? trimSlashes( basePath ) : null;
  const query = qs.stringify( params, { addQueryPrefix: true } );
  const url = [ sanitizedBaseUrl, sanitizedBasePath, slug ].filter( i => i ).join( '/' );

  return `${url}${query}`;
};

module.exports = buildUrl;
