'use strict';

const { getService, pluginId } = require( '../utils' );

module.exports = {
  async config( ctx ) {
    const config = await getService( 'plugin' ).getConfig();

    ctx.send( config );
  },
};
