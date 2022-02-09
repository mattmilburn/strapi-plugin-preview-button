const pluginPkg = require( '../../package.json' );
const pluginName = pluginPkg.name;

const getService = name => {
  return strapi.plugin( pluginName ).service( name );
};

module.exports = getService;
