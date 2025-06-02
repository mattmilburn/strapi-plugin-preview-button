import { useCallback, useEffect, useState } from 'react';
import { useStrapiApp } from '@strapi/strapi/admin';
import { type UID } from '@strapi/strapi';

import { type PreviewButtonStateConfig } from '../../../server/src/config';
import { HOOK_BEFORE_BUILD_URL, PLUGIN_ID } from '../constants';
import { getPublishStateConfig } from '../utils';
import usePluginConfig from './usePluginConfig';

export interface UsePreviewButtonReturn {
  isLoading: boolean;
  isSupported: boolean;
  draft: PreviewButtonStateConfig | null;
  published: PreviewButtonStateConfig | null;
}

export interface PreviewButtonBeforeBuildUrlProps {
  data: any;
  draft: PreviewButtonStateConfig | undefined;
  published: PreviewButtonStateConfig | undefined;
  uid: UID.ContentType;
}

const usePreviewButton = (uid: UID.ContentType | undefined, data: any): UsePreviewButtonReturn => {
  const runHookWaterfall = useStrapiApp(PLUGIN_ID, (value) => value.runHookWaterfall);
  const { data: config, isLoading } = usePluginConfig();

  const [draft, setDraft] = useState<PreviewButtonStateConfig | null>(null);
  const [published, setPublished] = useState<PreviewButtonStateConfig | null>(null);

  const uidConfig = config?.contentTypes?.find((type) => type.uid === uid);
  const isSupported = !!uid && !!uidConfig;

  const compileWithHooks = useCallback(async () => {
    if (!isSupported) {
      return;
    }

    // Run async hook then set state.
    const result = await runHookWaterfall(HOOK_BEFORE_BUILD_URL, {
      data,
      draft: uidConfig.draft,
      published: uidConfig.published,
      uid,
    } satisfies PreviewButtonBeforeBuildUrlProps);

    const draftConfig = getPublishStateConfig(result?.draft as PreviewButtonStateConfig, data);
    const publishedConfig = getPublishStateConfig(
      result?.published as PreviewButtonStateConfig,
      data
    );

    setDraft(draftConfig);
    setPublished(publishedConfig);
  }, [data, uidConfig, setDraft, setPublished, runHookWaterfall]);

  useEffect(() => {
    if (isLoading || !isSupported) {
      return;
    }

    compileWithHooks();
  }, [isLoading, isSupported, compileWithHooks]);

  return {
    isLoading,
    isSupported,
    draft,
    published,
  };
};

export default usePreviewButton;
