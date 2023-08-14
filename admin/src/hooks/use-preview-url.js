import { useCallback, useEffect, useMemo, useState } from 'react';
import { useStrapiApp } from '@strapi/helper-plugin';

import { HOOK_BEFORE_BUILD_URL } from '../constants';
import usePluginConfig from './use-plugin-config';
import { parseUrl } from '../utils';

const usePreviewUrl = (uid, data, isDraft, isCreating) => {
  const { runHookWaterfall } = useStrapiApp();
  const { data: config, isLoading } = usePluginConfig();
  const [url, setUrl] = useState(null);
  const [canCopy, setCopy] = useState(true);

  const openTarget = config?.openTarget;
  const uidConfig = config?.contentTypes?.find((type) => type.uid === uid);
  const isSupported = !!uidConfig;

  const pluginOptions = useMemo(() => {
    if (!isSupported) {
      return {};
    }

    return uidConfig[isDraft ? 'draft' : 'published'];
  }, [isSupported, isDraft, uidConfig]);

  const complete = useCallback(async () => {
    // Run async hook then set state.
    const { state } = await runHookWaterfall(
      HOOK_BEFORE_BUILD_URL,
      {
        /**
         * @TODO - Rename the `state` prop to `pluginOptions` in next major version.
         */
        state: pluginOptions,
        data,
      },
      true
    );
    const url = parseUrl(state, data);

    if (!url) {
      return;
    }

    setUrl(url);
    setCopy(state?.copy === false ? false : true);
  }, [data, pluginOptions, setCopy, setUrl, runHookWaterfall]);

  useEffect(() => {
    if (!isSupported || isLoading || isCreating) {
      return;
    }

    complete();
  }, [isSupported, isLoading, isCreating, complete]);

  return {
    canCopy,
    isLoading,
    isSupported,
    openTarget,
    url,
  };
};

export default usePreviewUrl;
