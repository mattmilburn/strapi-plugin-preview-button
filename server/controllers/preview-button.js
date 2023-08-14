'use strict';

const { getService } = require('../utils');

module.exports = {
  async config(ctx) {
    const config = await getService('config').get();

    ctx.send({ config });
  },
};
