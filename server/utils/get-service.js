'use strict';

const pluginId = require( './plugin-id' );

const getService = name => {
  return strapi.plugin( pluginId ).service( name );
};

module.exports = getService;
