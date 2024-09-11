import { getService } from '../utils';

const previewButtonController = {
  async config(ctx: any) {
    const config = await getService('config').get();

    ctx.send({ config });
  },
};

export default previewButtonController;
