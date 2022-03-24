'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'preview-button.config',
      config: {
        policies: [ 'admin::isAuthenticatedAdmin' ],
      },
    },
    {
      method: 'GET',
      path: '/:uid/:id',
      handler: 'preview-button.findOne',
      config: {
        policies: [ 'admin::isAuthenticatedAdmin' ],
      },
    },
    {
      method: 'GET',
      path: '/:uid',
      handler: 'preview-button.findOne',
      config: {
        policies: [ 'admin::isAuthenticatedAdmin' ],
      },
    },
  ],
};
