import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import { getTrad } from './utils';
import { Initializer, Injector } from './components';
import reducers from './reducers';

const pluginName = pluginPkg.strapi.displayName;

export default {
  register( app ) {
    app.addReducers( reducers );

    app.registerPlugin( {
      id: pluginId,
      name: pluginName,
      initializer: Initializer,
      isReady: false,
    } );
  },

  bootstrap( app ) {
    app.injectContentManagerComponent( 'editView', 'right-links', {
      name: 'preview-button',
      Component: Injector,
    } );
  },

  async registerTrads( { locales } ) {
    const importedTrads = await Promise.all(
      locales.map( locale => {
        return import( `./translations/${locale}.json` )
          .then( ( { default: data } ) => {
            return {
              data: prefixPluginTranslations( data, pluginId ),
              locale,
            };
          } )
          .catch( () => {
            return {
              data: {},
              locale,
            };
          } );
      } )
    );

    return Promise.resolve( importedTrads );
  },
};
