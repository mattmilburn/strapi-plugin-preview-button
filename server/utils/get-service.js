'use strict';

const pluginId = require( './plugin-id' );

const getService = name => strapi.plugin( pluginId ).service( name );

module.exports = getService;
