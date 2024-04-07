'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'preview-button.config',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
