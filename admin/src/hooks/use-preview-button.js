import { useCallback, useEffect, useState } from 'react';
import { useStrapiApp } from '@strapi/helper-plugin';

import { HOOK_BEFORE_BUILD_URL } from '../constants';
import usePluginConfig from './use-plugin-config';
import { getPublishStateConfig } from '../utils';

const usePreviewButton = (layout, data, isDraft, isCreating) => {
  const { runHookWaterfall } = useStrapiApp();
  const { data: config, isLoading } = usePluginConfig();
  const [draft, setDraft] = useState(null);
  const [published, setPublished] = useState(null);

  const { uid } = layout.contentType;
  const uidConfig = config?.contentTypes?.find((type) => type.uid === uid);
  const isSupported = !!uidConfig;

  const compileWithHooks = useCallback(async () => {
    // Run async hook then set state.
    const result = await runHookWaterfall(
      HOOK_BEFORE_BUILD_URL,
      {
        data,
        draft: uidConfig?.draft,
        published: uidConfig?.published,
      },
      true
    );

    const draftConfig = getPublishStateConfig(result?.draft, data);
    const publishedConfig = getPublishStateConfig(result?.published, data);

    setDraft(draftConfig);
    setPublished(publishedConfig);
  }, [data, uidConfig, setDraft, setPublished, runHookWaterfall]);

  useEffect(() => {
    if (!isSupported || isLoading || isCreating) {
      return;
    }

    compileWithHooks();
  }, [isSupported, isLoading, isCreating, compileWithHooks]);

  return {
    isLoading,
    isSupported,
    draft,
    published,
  };
};

export default usePreviewButton;
