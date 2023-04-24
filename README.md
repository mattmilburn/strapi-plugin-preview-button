<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo-2x.png" alt="Logo for Strapi preview button plugin" />
  <h1>Strapi Preview Button</h1>
  <p>A plugin for Strapi CMS that adds a preview button and live view button to the content manager edit view.</p>
  <img style="width: 960px; height: auto;" src="public/screenshot.png" alt="Screenshot for Strapi preview button plugin" />
</div>

## Get Started

* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [Extending](#extending)
* [User Guide](#user-guide)
* [Migration](#migration)
* [Support or Donate](#donate)

## <a id="features"></a>✨ Features
* Adds a new button in content manager sidebar which links the user to a preview or live view of a frontend app view.
* Include optional button to copy the preview link to your clipboard.
* Customize which content types should use the preview button.
* Customize endpoints for draft and published URLs.
* Map values from an entry's data into preview URLs.
* Supports collection and single types.
* Supports localization with the `i18n` Strapi plugin.
* Optionally include preview and copy icons in list view.

## <a id="installation"></a>💎 Installation
```bash
yarn add strapi-plugin-preview-button@latest
```

## <a id="configuration"></a>🔧 Configuration
| property | type (default) | description |
| - | - | - |
| contentTypes | array (`[]`) | An array of objects describing which content types should use the preview button. |
| contentTypes[].uid | string | The `uid` value of either a single or collection type. |
| contentTypes[].draft | object (`{}`) | A configuration object to enable a draft preview button. |
| contentTypes[].published | object (`{}`) | A configuration object to enable a live view button. |
| injectListViewColumn | boolean (`true`) | Set to `false` to disable the preview and copy link buttons from displaying in list view. |
| openTarget | string | Set to `_blank` to always open preview page in a new tab or window. Otherwise the preview will re-use the same preview tab or window. |

### `contentTypes`
An array of objects describing which content types should use the preview button.

Each object in the array requires the `uid` as well as `draft` and/or `published` props, which require a `url` prop at minimum.

| property | type (default) | description |
| - | - | - |
| url | string | The destination URL. See section about [mapping data into the URLs](#mapping-values-from-entry-data-into-preview-urls) for greater customization. |
| query | object (`{}`) | Optional query string params to include in the final URL. |
| copy | boolean (`true`) | Set to `false` to disable the copy link button that appears below the preview button. |

#### Example
Consider we have a `Home` single type as well as `Page` and `Post` collection types, where each has a simple `title` and `content` field. The `Page` and `Post` models will also use a `uid` field named `slug` so they can create many entries with unique paths. Here is the minimum recommended config for this scenario.

```js
// ./config/plugins.js
'use strict';

module.exports = {
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::home.home',
          published: {
            url: 'http://localhost:3000',
          },
        },
        {
          uid: 'api::page.page',
          draft: {
            url: 'http://localhost:3000/api/preview',
            query: {
              type: 'page',
              slug: '{slug}',
            },
          },
          published: {
            url: 'http://localhost:3000/{slug}',
          },
        },
        {
          uid: 'api::post.post',
          draft: {
            url: 'http://localhost:3000/api/preview',
            query: {
              type: 'post',
              slug: '{slug}',
            },
          },
          published: {
            url: 'http://localhost:3000/blog/{slug}',
          },
        },
      ],
    },
  },
};
```

In this example, the `Home` page is a single type and does not have `draftAndPublish` enabled so we do not use the `draft` prop.

For `Pages` and `Posts`, the `slug` value from the entry data is dynamically populating into the `url` and `query` props. This allows you to populate *any* `number` or `string` property from the entry data into the preview URL by using curly braces around the property name.

This configuration will result in the following preview URLs for `Home`, `Pages`, and `Posts`.

```
// Draft URLs
http://localhost:3000/api/preview?slug=my-page&type=page
http://localhost:3000/api/preview?slug=my-post&type=post

// Published URLs
http://localhost:3000/
http://localhost:3000/my-page
http://localhost:3000/blog/my-post
```

> The `query` prop can actually take any params you want to pass to your frontend app.

#### Mapping values from entry data into preview URLs
By using `{curly_braces}`, you can map values from the entry data into your preview URLs to customize the URL however you like.

For example, depending on how you are choosing to handle your preview method, you could pass an `id` value to your **draft preview** but pass a `slug` value to your **live view**.

> **Unmatched values** will be replaced with an empty string.

```js
{
  uid: 'api::page.page',
  draft: {
    url: 'http://localhost:3000/api/preview',
    query: {
      type: 'page',
      id: '{id}',
    },
  },
  published: {
    url: 'http://localhost:3000/{slug}',
  },
}
```

#### Use with localization enabled
If you have localization enabled for a content type, the `locale` value will be included in the entry data and replaced like the rest. You can simply use `{locale}` to include it where you like in the URL or query string.

```js
{
  uid: 'api::page.page',
  draft: {
    url: 'http://localhost:3000/api/preview',
    query: {
      type: 'page',
      locale: '{locale}',
      slug: '{slug}',
    },
  },
  published: {
    url: 'http://localhost:3000/{locale}/{slug}',
  },
}
```

#### Use a secret key with preview URLs
You can optionally use a secret key with your preview URLs by taking advantage of environment vars and the `query` prop. See example below.

```js
// ./config/plugins.js
'use strict';

module.exports = ( { env } ) => ( {
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::page.page',
          draft: {
            url: 'http://localhost:3000/api/preview',
            query: {
              type: 'page',
              slug: '{slug}',
              secret: env( 'STRAPI_PREVIEW_SECRET' ),
            },
          },
          published: {
            url: 'http://localhost:3000/{slug}',
          },
        },
      ],
    },
  },
} );
```

This configuration will result in the following preview URLs for `Pages`.

```
// Draft URL
http://localhost:3000/api/preview?slug=my-page&type=page&secret=YOUR_SECRET_KEY

// Published URL
http://localhost:3000/my-page
```

Before granting access to the preview in your frontend app, you will want to compare and validate the secret key between both Strapi and frontend apps.

> It may be important to note that this plugin does not offer any validation or other handling for a secret key. The goal of including a secret key is simply to give your frontend app some way of "shaking hands" with your backend app to approve of the preview access.

#### Disable copy link button
The "copy link" button located beneath the preview button can be disabled with the `copy: false` prop applied to `draft` and `published` configurations. This value is `true` by default.

```js
{
  uid: 'api::home.home',
  published: {
    url: 'http://localhost:3000',
    copy: false,
  },
}
```

### `injectListViewColumn`
Set to `false` to disable the preview and copy link buttons from displaying in list view. This applies to all configured content types.

```js
// ./config/plugins.js
'use strict';

module.exports = {
  'preview-button': {
    config: {
      injectListViewColumn: false,
      contentTypes: [
        // etc.
      ],
    },
  },
};
```

Ideally, the preview and copy link buttons in list view should appear alongside the other action icons for each row in the table. However, Strapi does not currently provide a hook to append new icons to that column. For now, this plugin will add its own "Preview" column with the extra icon actions.

<img style="width: 960px; height: auto;" src="public/list-view.png" alt="Screenshot for list view in Strapi preview button plugin" />

### `openTarget`
By default this value is set to `StrapiPreview`. It is used in the `window.open` function for the preview button to always open in the same tab.

If you would rather disable this and, for example, have the preview button always open in a new tab, you could use `_blank` as the value. Any special target keywords such as `_blank`, `_top`, `_self`, or `_parent` are acceptable values.

```js
// ./config/plugins.js
'use strict';

module.exports = {
  'preview-button': {
    config: {
      openTarget: '_blank',
      contentTypes: [
        // etc.
      ],
    },
  },
};
```

## <a id="extending"></a>🔩 Extending

If you need to apply more advanced logic to the preview URL, you can accomplish this with the `plugin/preview-button/before-build-url` hook included with this plugin.

Your Strapi app will need a **custom plugin** in order to use this hook.

> See [Plugins Development](https://docs.strapi.io/developer-docs/latest/development/plugins-development.html) in Strapi docs for more info.

#### Example
In this example, we will create the bare minimum for a Strapi plugin that allows us to run our custom hook. The file structure for the plugin will look like the code below.

```
/src/plugins/example
  /admin
    /src
      index.js
  package.json
  strapi-admin.js
```

The `package.json` is required for a Strapi plugin.

```js
// ./package.json

{
  "name": "example",
  "version": "0.1.0",
  "description": "Example.",
  "strapi": {
    "displayName": "Example",
    "name": "example",
    "description": "Example",
    "kind": "plugin"
  },
  "dependencies": {}
}
```

```js
// ./strapi-admin.js
'use strict';

module.exports = require( './admin/src' ).default;
```

In the main plugin file below, we register the plugin in the `register` method and we register the hook with the `bootstrap` method.

The `state` argument is the original config object from `config/plugins.js`. So if you are editing a `Page` in draft mode, you will get the draft config for `Pages` from your plugin config passed into the callback.

Here you can modify and return `state` while using `data` to make decisions.

```js
// ./admin/src/index.js

export default {
  register( app ) {
    app.registerPlugin( {
      id: 'example',
      name: 'example',
    } );
  },

  bootstrap( app ) {
    app.registerHook( 'plugin/preview-button/before-build-url', ( { state, data } ) => {
      const query = state?.query ?? {};

      // Return modified `state` object here.
      return {
        state: {
          ...state,
          query: {
            ...query,
            example: 'EXAMPLE',
          },
        },
      };
    } );
  },
};
```

Finally, don't forget to enable your plugin in your app by adding it to `config/plugins.js`.

```js
// ./config/plugins.js
'use strict';

module.exports = {
  'example': {
    enabled: true,
    resolve: './src/plugins/example',
  },
};
```

## <a id="user-guide"></a>📘 User Guide

### How does this work with my frontend app?
The **Open live view** button will lead directly to the live page URL.

The **Open draft preview** button should lead to an endpoint that redirects to the appropriate preview page based on the query parameters passed to it.

For in-depth examples and instructions, please reference the links below to learn how this can be accomplished with Next.js and Strapi.

* [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
* [Next.js Preview Mode example with Strapi](https://github.com/vercel/next.js/tree/canary/examples/cms-strapi)

## <a id="migration"></a>🚌 Migration
Follow the [migration guides](MIGRATION.md) to keep your preview button plugin up-to-date.

## <a id="donate"></a>❤️ Support or Donate
If you are enjoying this plugin and feel extra appreciative, you can [buy me a beer or 3 🍺🍺🍺](https://www.buymeacoffee.com/mattmilburn).
