'use strict';

const { ValidationError } = require('@strapi/utils').errors;
const has = require('lodash/has');

module.exports = {
  default: {
    contentTypes: [],
  },
  validator(config) {
    if (!has(config, 'contentTypes')) {
      return;
    }

    // Ensure `contentTypes` is an array.
    if (!Array.isArray(config.contentTypes)) {
      throw new ValidationError(`Must define contentTypes as an array.`);
    }

    // Validate each content type object.
    config.contentTypes.forEach((entry) => {
      const hasDraft = has(entry, 'draft');
      const hasPublished = has(entry, 'published');

      // Require `uid` prop.
      if (!has(entry, 'uid')) {
        throw new ValidationError('Missing uid prop.');
      }

      // Require at least a `draft` or `published` prop.
      if (!hasDraft && !hasPublished) {
        throw new ValidationError(
          `The config for ${entry.uid} requires at least a draft or published prop to be defined.`
        );
      }

      // Require `url` props.
      if (hasDraft && !has(entry, ['draft', 'url'])) {
        throw new ValidationError(`Missing draft URL for ${entry.uid}.`);
      }

      if (hasPublished && !has(entry, ['published', 'url'])) {
        throw new ValidationError(`Missing published URL for ${entry.uid}.`);
      }
    });
  },
};
