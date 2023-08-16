import { useCallback, useEffect, useMemo, useState } from 'react';
import get from 'lodash/get';
import { useStrapiApp } from '@strapi/helper-plugin';

import { HOOK_BEFORE_BUILD_URL, PREVIEW_WINDOW_NAME } from '../constants';
import usePluginConfig from './use-plugin-config';
import { parseUrl, pluginId } from '../utils';

const usePreviewButton = (layout, data, isDraft, isCreating) => {
  const { runHookWaterfall } = useStrapiApp();
  const { data: config, isLoading } = usePluginConfig();
  const [url, setUrl] = useState(null);
  const [canCopy, setCopy] = useState(true);

  const { contentType } = layout;
  const { uid } = contentType;
  const openTarget = get(
    contentType,
    ['pluginOptions', pluginId, 'openTarget'],
    PREVIEW_WINDOW_NAME
  );
  const uidConfig = config?.contentTypes?.find((type) => type.uid === uid);
  const isSupported = !!uidConfig;

  const optionsFromConfig = useMemo(() => {
    if (!isSupported) {
      return {};
    }

    return uidConfig[isDraft ? 'draft' : 'published'];
  }, [isSupported, isDraft, uidConfig]);

  const compileUrl = useCallback(async () => {
    // Run async hook then set state.
    const { options } = await runHookWaterfall(
      HOOK_BEFORE_BUILD_URL,
      { data, options: optionsFromConfig },
      true
    );

    const url = parseUrl(options, data);

    // Do nothing if we failed to build the URL for some reason.
    if (!url) {
      return;
    }

    setUrl(url);
    setCopy(options?.copy === false ? false : true);
  }, [data, optionsFromConfig, setCopy, setUrl, runHookWaterfall]);

  useEffect(() => {
    if (!isSupported || isLoading || isCreating) {
      return;
    }

    compileUrl();
  }, [isSupported, isLoading, isCreating, compileUrl]);

  return {
    canCopy,
    isLoading,
    isSupported,
    openTarget,
    url,
  };
};

export default usePreviewButton;
