<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo.png" alt="Logo for Strapi preview button plugin" />
  <h1>Strapi Preview Button</h1>
  <p>A plugin for Strapi CMS that adds a preview button and live view button to the content manager edit view.</p>
  <img style="width: 960px; height: auto;" src="public/screenshot.png" alt="Screenshot for Strapi preview button plugin" />
</div>

## Get Started

* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [User Guide](#user-guide)

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
module.exports = ( { env } ) => {
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
};
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

## <a id="user-guide"></a>📘 User Guide

### How does this work with my frontend app?
The **Open live view** button will lead directly to the live page URL.

The **Open draft preview** button should lead to an endpoint that redirects to the appropriate preview page based on the query parameters passed to it.

For in-depth examples and instructions, please reference the links below to learn how this can be accomplished with Next.js and Strapi.

* [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
* [Next.js Preview Mode example with Strapi](https://github.com/vercel/next.js/tree/canary/examples/cms-strapi)
