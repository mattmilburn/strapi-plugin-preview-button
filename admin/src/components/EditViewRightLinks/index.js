import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewButton } from '../../hooks';
import PreviewButtonGroup from '../PreviewButtonGroup';

const EditViewRightLinks = () => {
  const { allLayoutData, hasDraftAndPublish, isCreatingEntry, initialData } =
    useCMEditViewDataManager();
  const isDraft = hasDraftAndPublish && !initialData?.publishedAt;

  const { isLoading, isSupported, draft, published } = usePreviewButton(
    allLayoutData,
    initialData,
    isDraft,
    isCreatingEntry
  );

  if (!isSupported || isCreatingEntry || isLoading) {
    return null;
  }

  const showPublished = !!published && !isDraft;
  const showDraft = !!draft && (isDraft || draft?.alwaysVisible);

  return (
    <>
      {showPublished && <PreviewButtonGroup data={published} isDraft={false} />}
      {showDraft && <PreviewButtonGroup data={draft} isDraft />}
    </>
  );
};

export default EditViewRightLinks;
