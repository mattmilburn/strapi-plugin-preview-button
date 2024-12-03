import { EditViewRightLinks } from './components';
import { HOOK_BEFORE_BUILD_URL, PLUGIN_ID, PLUGIN_NAME } from './constants';
import { addPreviewColumn } from './contentManagerHooks';
import reducers from './reducers';
import { prefixPluginTranslations } from './utils';

export default {
  register(app: any) {
    app.addReducers(reducers);

    app.createHook(HOOK_BEFORE_BUILD_URL);

    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_NAME,
    });
  },

  bootstrap(app: any) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: PLUGIN_ID,
      Component: EditViewRightLinks,
    });

    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', addPreviewColumn);
  },

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data),
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
