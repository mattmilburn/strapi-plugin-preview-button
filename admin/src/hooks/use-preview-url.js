import { useCallback, useEffect, useState } from 'react';
import { useStrapiApp } from '@strapi/helper-plugin';

import { HOOK_BEFORE_BUILD_URL } from '../constants';
import usePluginConfig from './use-plugin-config';
import { parseUrl } from '../utils';

const usePreviewUrl = (uid, data, isDraft, isCreating) => {
  const { runHookWaterfall } = useStrapiApp();
  const { data: config, isLoading } = usePluginConfig();
  const [url, setUrl] = useState(null);
  const [canCopy, setCopy] = useState(true);

  const uidConfig = config?.contentTypes?.find((type) => type.uid === uid);
  const isSupported = !!uidConfig;

  const complete = useCallback(async () => {
    const configFromState = uidConfig[isDraft ? 'draft' : 'published'];

    // Run async hook then set state.
    const { state } = await runHookWaterfall(
      HOOK_BEFORE_BUILD_URL,
      {
        /**
         * @TODO - Rename the `state` prop to `config` in next major version.
         */
        state: configFromState,
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
  }, [uidConfig, data, isDraft, setCopy, setUrl, runHookWaterfall]);

  useEffect(() => {
    if (!isSupported || isLoading || isCreating) {
      return;
    }

    complete();
  }, [isLoading, isCreating, isSupported, complete]);

  return {
    canCopy,
    isLoading,
    isSupportedType: isSupported,
    url,
  };
};

export default usePreviewUrl;
