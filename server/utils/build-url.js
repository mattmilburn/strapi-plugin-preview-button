'use strict';

const qs = require( 'qs' );

const stripSlashes = str => str ? str.replace( /^\//, '' ).replace( /\/$/, '' ) : '';

const buildUrl = ( baseUrl, basePath, slug, params ) => {
  const sanitizedBaseUrl = stripSlashes( baseUrl );
  const sanitizedBasePath = stripSlashes( basePath );
  const query = qs.stringify( params, { addQueryPrefix: true } );
  const url = [ sanitizedBaseUrl, sanitizedBasePath, slug ].filter( i => i ).join( '/' );

  return `${url}${query}`;
};

module.exports = buildUrl;
