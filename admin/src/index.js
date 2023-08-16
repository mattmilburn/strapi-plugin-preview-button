import { prefixPluginTranslations } from '@strapi/helper-plugin';

import { EditViewRightLinks } from './components';
import { HOOK_BEFORE_BUILD_URL } from './constants';
import { addPreviewColumn } from './contentManagerHooks';
import reducers from './reducers';
import { pluginId, pluginName } from './utils';

export default {
  register(app) {
    app.addReducers(reducers);

    app.createHook(HOOK_BEFORE_BUILD_URL);

    app.registerPlugin({
      id: pluginId,
      name: pluginName,
    });
  },

  bootstrap(app) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: pluginId,
      Component: EditViewRightLinks,
    });

    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', addPreviewColumn);
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
