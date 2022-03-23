'use strict';

const config = require( './config' );
const controllers = require( './controllers' );
const routes = require( './routes' );
const services = require( './services' );

module.exports = {
  register() {},
  bootstrap() {},
  destroy() {},
  config,
  contentTypes: {},
  controllers,
  middlewares: {},
  policies: {},
  routes,
  services,
};
