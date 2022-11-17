import { prefixPluginTranslations, request } from '@strapi/helper-plugin';

import { getTrad, pluginId, pluginName } from './utils';
import { Initializer, Injector } from './components';
import { addPreviewColumn } from './contentManagerHooks';
import reducers from './reducers';

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

  async bootstrap( app ) {
    app.injectContentManagerComponent( 'editView', 'right-links', {
      name: pluginId,
      Component: Injector,
    } );

    try {
      const endpoint = `/${pluginId}/config`;
      const data = await request( endpoint, { method: 'GET' } );
      const pluginConfig = data ?? {};

      // Create callbacks with plugin config included.
      const listViewColumnHook = props => addPreviewColumn( props, pluginConfig );

      // Register hooks.
      app.registerHook( 'Admin/CM/pages/ListView/inject-column-in-table', listViewColumnHook );
    } catch ( _err ) {
      /**
       * @TODO - Apparently this is causing issues when this fails for a logged-out user.
       */

      // Probably just failed because user is not logged in, which is fine.
      return;
    }
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
