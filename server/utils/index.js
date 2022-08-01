'use strict';

const getService = require( './get-service' );
const buildUrl = require( './build-url' );
const pluginId = require( './plugin-id' );
const trimSlashes = require( './trim-slashes' );

module.exports = {
  buildUrl,
  getService,
  pluginId,
  trimSlashes,
};
