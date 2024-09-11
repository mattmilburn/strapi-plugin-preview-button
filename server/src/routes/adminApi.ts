const adminApiRoutes = {
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

export default adminApiRoutes;