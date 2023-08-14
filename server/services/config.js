'use strict';

const { default: defaultConfig } = require('../config');
const { pluginId } = require('../utils');

module.exports = ({ strapi }) => ({
  async get() {
    const config = await strapi.config.get(`plugin.${pluginId}`, defaultConfig);

    return config;
  },
});
