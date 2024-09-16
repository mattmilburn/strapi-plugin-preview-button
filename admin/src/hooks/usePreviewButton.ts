import { useStrapiApp } from '@strapi/admin/strapi-admin';
import { useCallback, useEffect, useState } from 'react';

import { type UID } from '@strapi/strapi';
import { type PreviewButtonStateConfig } from '../../../server/src/config';
import { HOOK_BEFORE_BUILD_URL } from '../constants';
import { getPublishStateConfig } from '../utils';
import usePluginConfig from './usePluginConfig';

export interface UsePreviewButtonReturn {
  isLoading: boolean;
  isSupported: boolean;
  draft: PreviewButtonStateConfig | null;
  published: PreviewButtonStateConfig | null;
}

const usePreviewButton = (
  uid: UID.ContentType | undefined,
  data: any,
): UsePreviewButtonReturn => {
  const runHookWaterfall = useStrapiApp('PreviewButton', (value) => value.runHookWaterfall);
  const { data: config, isLoading } = usePluginConfig();

  const [draft, setDraft] = useState<PreviewButtonStateConfig | null>(null);
  const [published, setPublished] = useState<PreviewButtonStateConfig | null>(null);

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
      }
    );

    const draftConfig = getPublishStateConfig(result?.draft as PreviewButtonStateConfig, data);
    const publishedConfig = getPublishStateConfig(result?.published as PreviewButtonStateConfig, data);

    setDraft(draftConfig);
    setPublished(publishedConfig);
  }, [data, uidConfig, setDraft, setPublished, runHookWaterfall]);

  useEffect(() => {
    if (!isSupported || isLoading) {
      return;
    }

    compileWithHooks();
  }, [isSupported, isLoading, compileWithHooks]);

  return {
    isLoading,
    isSupported,
    draft,
    published,
  };
};

export default usePreviewButton;
