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

    // Do nothing if we failed to build the URL for some reason.
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

export default usePreviewButton;
