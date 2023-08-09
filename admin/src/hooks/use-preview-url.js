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

  const match = config?.contentTypes?.find((type) => type.uid === uid);
  const isSupportedType = !!match;

  const complete = useCallback(async () => {
    const stateFromConfig = match[isDraft ? 'draft' : 'published'];

    // Run async hook then set state.
    const { state } = await runHookWaterfall(
      HOOK_BEFORE_BUILD_URL,
      { state: stateFromConfig, data },
      true
    );
    const url = parseUrl(state, data);

    if (!url) {
      return;
    }

    setUrl(url);
    setCopy(state?.copy === false ? false : true);
  }, [match, data, isDraft, setUrl, setCopy, runHookWaterfall]);

  useEffect(() => {
    if (isLoading || isCreating || !isSupportedType) {
      return;
    }

    complete();
  }, [data, isDraft, isCreating, isLoading, isSupportedType, complete]);

  return {
    canCopy,
    isLoading,
    isSupportedType,
    url,
  };
};

export default usePreviewUrl;
