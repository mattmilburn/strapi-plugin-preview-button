<div align="center">
  <img style="width: 160px; height: auto; border-radius: 10%;" src="public/logo.jpg" alt="Logo for Strapi preview button plugin" />
</div>

<div align="center">
  <h1>Strapi Preview Button</h1>
  <p>A plugin for Strapi CMS that adds a preview button and live view button to the content manager edit view.</p>
</div>

## Setup

* [Install](#install)
* [Required environment vars](#required-environment-vars)
* [Enable the plugin](#enable-the-plugin)
* [Configure content types](#configure-content-types)
* [Optional URL props](#optional-url-props)
* [Draft and publish mode](#draft-and-publish-mode)
* [How does this work with my frontend app?](#how-does-this-work-with-my-frontend-app)

### Install
```
yarn add strapi-plugin-preview-button@latest
```

### Required environment vars
Include the following variables in your application's `.env` file.

You must generate your own secret key to use for `STRAPI_PREVIEW_SECRET` which will also be given to the frontend app later.

```
STRAPI_PREVIEW_SECRET=yoursecretgoeshere
STRAPI_PREVIEW_DRAFT_URL=https://example.com/api/preview
STRAPI_PREVIEW_PUBLISHED_URL=https://example.com
```

### Enable the plugin
Start by adding the following code for `preview-button` to `/config/plugins.js`.

```
module.exports = {
  'preview-button': {
    enabled: true,
    resolve: './node_modules/strapi-plugin-preview-button',
    config: {},
  },
};
```

### Configure content types
In the `config` prop for `preview-button`, add a `contentTypes` property as an array of objects containing the properties `uid` and `targetField`.

The `targetField` prop allows to specify which field in the schema to use for the URL slug value. The field name `slug` is recommended as it represents the unique part of the URL path. However, this field name is customizable per content type.

```
config: {
  contentTypes: [
    {
      uid: 'api::page.page',
      targetField: 'slug',
    },
    {
      uid: 'api::post.post',
      targetField: 'slug',
    },
  ],
}
```

### Optional URL props
Each content type may optionally include a `query` string object for the draft URL and a `basePath` for the published URL.

```
config: {
  contentTypes: [
    {
      uid: 'api::page.page',
      targetField: 'slug',
    },
    {
      uid: 'api::post.post',
      targetField: 'slug',
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

### Draft and publish mode
With `draftAndPublish` mode enabled for a content type, a preview button will render when the entry is in a draft state while a live view button will render when it is in a published state.

It is **not** required to enable `draftAndPublish` for content types using this plugin. The live view button will still display to conveniently redirect a user to the live version of the page.

### How does this work with my frontend app?

The **Open live view** button will lead directly to the live page URL.

However, the **Open draft preview** button should lead to an endpoint that redirects the user to the appropriate preview page based on the query parameters passed to it.

Before granting access to the preview, the values for `STRAPI_PREVIEW_SECRET` should be compared and validated between both Strapi and the frontend app.

For in-depth examples and instructions, please reference the links below to learn how this can be accomplished with Next.js and Strapi.

* [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
* [Next.js Preview Mode example with Strapi](https://github.com/vercel/next.js/tree/canary/examples/cms-strapi)
