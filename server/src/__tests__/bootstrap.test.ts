import bootstrap from '../bootstrap';
import { PLUGIN_ID } from '../constants';
import { getService } from '../utils';

jest.mock('../utils', () => ({
  getService: jest.fn(),
}));

describe('bootstrap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should default listViewColumn to true for configured contentTypes', async () => {
    (getService as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({
        contentTypes: [{ uid: 'api::page.page' }, { uid: 'api::post.post' }],
      }),
    });

    const strapi: any = {
      contentTypes: {
        'api::page.page': {
          pluginOptions: {
            i18n: { localized: true },
          },
        },
        'api::post.post': {
          pluginOptions: {
            [PLUGIN_ID]: {
              listViewColumn: false,
            },
          },
        },
        'api::other.other': {
          pluginOptions: {},
        },
      },
    };

    await bootstrap({ strapi });

    expect(strapi.contentTypes['api::page.page'].pluginOptions).toEqual({
      i18n: { localized: true },
      [PLUGIN_ID]: {
        listViewColumn: true,
      },
    });

    expect(strapi.contentTypes['api::post.post'].pluginOptions).toEqual({
      [PLUGIN_ID]: {
        listViewColumn: false,
      },
    });

    expect(strapi.contentTypes['api::other.other'].pluginOptions).toEqual({});
  });
});
