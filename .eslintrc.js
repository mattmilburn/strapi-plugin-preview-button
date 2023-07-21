'use strict';

const backPaths = ['server/**/*.js', 'server/*.js'];
const frontPaths = ['admin/src/**/*.js', 'admin/src/**/**/*.js'];

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: backPaths,
      excludedFiles: frontPaths,
      ...require('./.eslintrc.back.js'),
    },
    {
      files: frontPaths,
      excludedFiles: backPaths,
      ...require('./.eslintrc.front.js'),
    },
  ],
};
