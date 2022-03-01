<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo.png" alt="Logo for Strapi preview button plugin" />
  <h1>Strapi Preview Button</h1>
  <p>A plugin for Strapi CMS that adds a preview button and live view button to the content manager edit view.</p>
  <img style="width: 960px; height: auto;" src="public/screenshot.png" alt="Screenshot for Strapi preview button plugin" />
</div>

## Get Started

* [Features](#features)
* [Installation](#installation)
* [Requirements](#requirements)
* [Configuration](#configuration)
* [User Guide](#user-guide)

## :sparkles: Features
* New button in content manager sidebar which links the user to a preview or live view of a frontend app view.
* Customize which content types should use the preview button.
* Customize endpoints for draft and published URLs.

## :gem: Installation
```bash
yarn add strapi-plugin-preview-button@latest
```

## :exclamation: Requirements
Include the following variables in your application's `.env` file.

```
STRAPI_PREVIEW_SECRET=YOURSECRET
STRAPI_PREVIEW_DRAFT_URL=https://example.com/api/preview
STRAPI_PREVIEW_PUBLISHED_URL=https://example.com
```

You must generate your own secret key to use for `STRAPI_PREVIEW_SECRET` which will also be given to the frontend app later.

#### Draft and publish mode
With `draftAndPublish` mode enabled for a content type, a preview button will render when the entry is in a draft state while a live view button will render when it is in a published state.

It is **not** required to enable `draftAndPublish` for content types using this plugin. The live view button will still display to conveniently redirect a user to the live version of the page.

## :wrench: Configuration
| property | type (default) | description |
| - | - | - |
| contentTypes | array (`[]`) | An array of objects describing which content types should use the preview button. |

### `contentTypes`
An array of objects describing which content types should use the preview button.

Each object in the array requires a `uid` and `targetField` prop. The field name "slug" is recommended for the `targetField` value because it represents the unique part of the URL path, but it is not required.

#### Example
Consider we have `Page` and `Post` content types, where each has a `uid` field named `slug` and entries created for each, with the slug values set to `my-page` and `my-post`.

```js
module.exports = {
  'preview-button': {
    enabled: true,
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
    },
  },
};
```

In this example, our pages and posts will be routed differently in our frontend app. To help with this, each content type may include a `query` string object for the draft URL and a `basePath` for the published URL.

```js
module.exports = {
  'preview-button': {
    enabled: true,
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
    },
  },
};
```

This configuration will result in the following preview URLs for `Page` and `Post`. Notice in the URLs below how env vars and config settings work together to build the final URLs.

##### Draft URL paths
```
https://example.com/api/preview?slug=my-page&secret=YOURSECRET
https://example.com/api/preview?slug=my-post&type=post&secret=YOURSECRET
```

##### Published URL paths
```
https://example.com/my-page
https://example.com/blog/my-post
```

## :blue_book: User Guide

### How does this work with my frontend app?

The **Open live view** button will lead directly to the live page URL.

The **Open draft preview** button should lead to an endpoint that redirects to the appropriate preview page based on the query parameters passed to it.

Before granting access to the preview, the values for `STRAPI_PREVIEW_SECRET` should be compared and validated between both Strapi and the frontend app.

For in-depth examples and instructions, please reference the links below to learn how this can be accomplished with Next.js and Strapi.

* [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
* [Next.js Preview Mode example with Strapi](https://github.com/vercel/next.js/tree/canary/examples/cms-strapi)
