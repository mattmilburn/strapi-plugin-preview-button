import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewButton } from '../../hooks';
import CopyLinkButton from '../CopyLinkButton';
import PreviewButton from '../PreviewButton';

const EditViewRightLinks = () => {
  const { allLayoutData, hasDraftAndPublish, isCreatingEntry, modifiedData } =
    useCMEditViewDataManager();
  const isDraft = hasDraftAndPublish && !modifiedData?.publishedAt;
  const { uid } = allLayoutData.contentType;
  const { canCopy, isLoading, isSupported, openTarget, url } = usePreviewButton(
    uid,
    modifiedData,
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
