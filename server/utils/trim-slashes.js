'use strict';

const trimSlashes = str => str.replace( /^\/|\/$/, '' );

module.exports = trimSlashes;
