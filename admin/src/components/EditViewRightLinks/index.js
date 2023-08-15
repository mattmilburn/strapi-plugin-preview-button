import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewButton } from '../../hooks';
import CopyLinkButton from '../CopyLinkButton';
import PreviewButton from '../PreviewButton';

const EditViewRightLinks = () => {
  const { allLayoutData, hasDraftAndPublish, isCreatingEntry, initialData } =
    useCMEditViewDataManager();
  const isDraft = hasDraftAndPublish && !initialData?.publishedAt;

  const { canCopy, isLoading, isSupported, openTarget, url } = usePreviewButton(
    allLayoutData,
    initialData,
    isDraft,
    isCreatingEntry
  );

  if (!isSupported || isCreatingEntry || isLoading || !url) {
    return null;
  }

  /**
   * @TODO - Maybe use React.Suspense here with isLoading?
   */

  return (
    <>
      <PreviewButton isDraft={isDraft} url={url} target={openTarget} />
      {canCopy && <CopyLinkButton isDraft={isDraft} url={url} />}
    </>
  );
};

export default EditViewRightLinks;
