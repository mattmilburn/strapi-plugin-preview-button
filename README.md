## Preview Button

Add a preview button to the content manager edit view.

| Required environment vars |
| -- |
| `STRAPI_PREVIEW_SECRET` |
| `STRAPI_PREVIEW_DRAFT_URL` |
| `STRAPI_PREVIEW_PUBLISHED_URL` |

#### Enable the plugin

Start by adding the following code to `/config/plugins.js`.

```
module.exports = {
  'preview-button': {
    enabled: true,
    resolve: './src/plugins/preview-button',
    config: {},
  },
};
```

#### Configure content types to use the preview button

In the `config` prop for `preview-button`, add a `contentTypes` property as an array of `uids`.

```
config: {
  contentTypes: [
    'api::page.page',
    'api::post.post',
  ],
}
```

#### OR provide a configuration object for content types

Content type objects for drafts may include a `query` string object while published items may include a `basePath` for the destination URL.

```
config: {
  contentTypes: [
    'api::page.page',
    {
      uid: 'api::post.post',
      draft: {
        query: {
          type: 'post',
        },
      },
      published: {
        basePath: 'blog',
      },
    },
  ],
}
```
