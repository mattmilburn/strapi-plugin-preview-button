<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo.png" alt="Logo for Strapi preview button plugin" />
  <h1>Strapi Preview Button Migration Guides</h1>
  <p>Follow our migration guides to keep your preview button plugin up-to-date.</p>
</div>

## Get Started

* [Migrate from v1 to v2](#migrate-from-v1-to-v2)
* [Migrate from v0 to v1](#migrate-from-v0-to-v1)

---

## Migrate from v1 to v2
There is only one breaking change when migrating from version 1 to 2 of this plugin. The config options for `injectListViewColumn` and `openTarget` have now moved to the `pluginOptions` prop of model schemas.

#### `injectListViewColumn` and `openTarget`
Previously, these config options were used alongside the rest of the config options in `./config/plugins.js` but they have moved to the `pluginOptions` prop of a model schema and will need to be applied to each schema individually.

In addition to the new location, the `injectListViewColumn` option is renamed to `listViewColumn` and it is set to `true` by default. You can disable the extra column by setting this value to `false` like in the code below.

This change allows Strapi to inject a custom column into the content manager's list view without relying on fetching data, which solves issues that were related to this feature.

#### ❌ Not correct
```js
// ./config/plugins.js
'use strict';

module.exports = {
  'preview-button': {
    config: {
      injectListViewColumn: true,
      openTarget: 'StrapiPreview',
      contentTypes: [
        // etc.
      ],
    },
  },
};
```

#### ✅ Correct
```js
// ./src/api/page/content-types/page/schema.js
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": ""
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "preview-button": {
      "listViewColumn": false,
      "openTarget": "StrapiPreview"
    }
  },
  "attributes": {
    // etc.
  }
}
```

---

## Migrate from v0 to v1
The breaking changes in this migration are focused on configuration while simplifying code and requirements. As a result, much of the plugin configuration has changed.

### Environment vars are no longer required
Previously, the plugin required the following env vars be configured in order to use the preview button.

```
STRAPI_PREVIEW_SECRET=YOURSECRET
STRAPI_PREVIEW_DRAFT_URL=https://example.com/api/preview
STRAPI_PREVIEW_PUBLISHED_URL=https://example.com
```

This is now optional and requires no extra handling from this plugin. To continue using these env vars, simply include them as you see below:

```js
// ./config/plugins.js
module.exports = ({ env }) => {
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::page.page',
          draft: {
            url: env('STRAPI_PREVIEW_DRAFT_URL'),
            query: {
              type: 'page',
              slug: '{slug}',
              secret: env('STRAPI_PREVIEW_SECRET'),
            },
          },
          published: {
            url: `${env('STRAPI_PREVIEW_PUBLISHED_URL')}/{slug}`,
          },
        },
      ],
    },
  },
};
```

### Deprecated `basePath` and `targetField` options
These options are no longer used. See the section in the README about [mapping data into the URLs](README.md#mapping-values-from-entry-data-into-preview-urls) for customizing URLs.

### New options

#### `url`
Both `draft` and `published` configurations now require a `url` prop which allows mapping data from the entry data into the URL with great ease. See the section in the README about [mapping data into the URLs](README.md#mapping-values-from-entry-data-into-preview-urls) for customizing URLs.

#### `copy`
A "Copy Link" button has been added beneath the preview button in the content manager. This button is enabled by default.

If you wish to disable this button for the draft or published state (or both) then you need to use `copy: false` for `draft` and `published` configurations as you see below:

```js
// ./config/plugins.js
{
  uid: 'api::page.page',
  draft: {
    url: 'https://example.com/api/preview',
    query: {
      type: 'page',
      slug: '{slug}',
    },
    copy: false,
  },
  published: {
    url: 'http://localhost:3000',
    copy: false,
  },
}
```

#### `injectListViewColumn`
An icon button for the preview and copy buttons have been added to a new column in the list view of the content manager.

If you wish to disable this, set it to `false`. This applies to all configured content types.

```js
// ./config/plugins.js
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

### Other details
In case you have been extending the plugin yourself, it may be useful to know a few extra behind-the-scenes details.

#### No more re-fetching
The plugin no longer fetches the preview URLs on state change. Instead the plugin config is loaded when Strapi starts and is available on the frontend at all times.

#### Single and Collection types
The plugin no longer needs to differentiate between single types and collection types.

#### Localization
If you have localization enabled for a content type, the `locale` is now automatically parsed into the URLs as long as you include `{locale}` in your config. See the section in the README about [Using with localization enabled](README.md#use-with-localization-enabled) with the preview button.
