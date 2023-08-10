'use strict';

module.exports = {
  extends: ['./.eslintrc.base.js', 'plugin:node/recommended'],
  rules: {
    'import/no-unresolved': 0,
    'node/no-unpublished-require': 'off',
    'node/no-extraneous-require': 'off',
    'node/exports-style': ['error', 'module.exports'],
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/no-callback-literal': 'error',
    'node/handle-callback-err': 'error',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-param-reassign': 0,
    'no-shadow': 'off',
    'no-underscore-dangle': 0,
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    'consistent-return': 'off',
  },
};
