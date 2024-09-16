import { type UID } from '@strapi/strapi';
import { errors } from '@strapi/utils';
import has from 'lodash/has';

export interface PreviewButtonStateConfig {
  url: string;
  query?: Record<string, any>;
  openTarget?: string;
  copy?: boolean;
  alwaysVisible?: boolean;
}

export interface PreviewButtonPluginConfig {
  contentTypes?: {
    uid: UID.ContentType;
    draft?: PreviewButtonStateConfig;
    published?: PreviewButtonStateConfig;
  }[] | null;
}

export const defaultConfig: PreviewButtonPluginConfig = {
  contentTypes: null,
};

export default {
  default: defaultConfig,
  validator(config: PreviewButtonPluginConfig) {
    if (!has(config, 'contentTypes')) {
      return;
    }

    // Ensure `contentTypes` is an array.
    if (!Array.isArray(config.contentTypes)) {
      throw new errors.ValidationError(`Must define contentTypes as an array.`);
    }

    // Validate each content type object.
    config.contentTypes.forEach((entry) => {
      const hasDraft = has(entry, 'draft');
      const hasPublished = has(entry, 'published');

      // Require `uid` prop.
      if (!has(entry, 'uid')) {
        throw new errors.ValidationError('Missing uid prop.');
      }

      // Require at least a `draft` or `published` prop.
      if (!hasDraft && !hasPublished) {
        throw new errors.ValidationError(
          `The config for ${entry.uid} requires at least a draft or published prop to be defined.`
        );
      }

      // Require `url` props.
      if (hasDraft && !has(entry, ['draft', 'url'])) {
        throw new errors.ValidationError(`Missing draft URL for ${entry.uid}.`);
      }

      if (hasPublished && !has(entry, ['published', 'url'])) {
        throw new errors.ValidationError(`Missing published URL for ${entry.uid}.`);
      }
    });
  },
};
