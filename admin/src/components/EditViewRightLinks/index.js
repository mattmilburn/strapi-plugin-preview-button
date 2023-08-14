import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewUrl } from '../../hooks';
import CopyLinkButton from '../CopyLinkButton';
import PreviewButton from '../PreviewButton';

const EditViewRightLinks = () => {
  const { allLayoutData, hasDraftAndPublish, isCreatingEntry, modifiedData } =
    useCMEditViewDataManager();
  const isDraft = hasDraftAndPublish && !modifiedData?.publishedAt;
  const { uid } = allLayoutData.contentType;
  const { canCopy, isLoading, isSupported, openTarget, url } = usePreviewUrl(
    uid,
    modifiedData,
    isDraft,
    isCreatingEntry
  );

  if (!isSupported || isCreatingEntry || isLoading || !url) {
    return null;
  }

  return (
    <>
      <PreviewButton isDraft={isDraft} url={url} target={openTarget} />
      {canCopy && <CopyLinkButton isDraft={isDraft} url={url} />}
    </>
  );
};

export default EditViewRightLinks;
