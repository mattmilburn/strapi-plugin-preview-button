import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewUrl } from '../../hooks';
import { CopyLinkButton, PreviewButton } from '../';

const Injector = () => {
  const {
    allLayoutData,
    hasDraftAndPublish,
    initialData,
    isCreatingEntry,
    modifiedData,
  } = useCMEditViewDataManager();
  const isDraft = hasDraftAndPublish && ! modifiedData.publishedAt;
  const { uid } = allLayoutData.contentType;
  const {
    canCopy,
    isLoading,
    isSupportedType,
    url,
  } = usePreviewUrl( uid, modifiedData, isDraft, isCreatingEntry );

  if ( ! url || ! isSupportedType || isCreatingEntry || isLoading ) {
    return null;
  }

  return (
    <>
      <PreviewButton isDraft={ isDraft } url={ url } />
      { canCopy && <CopyLinkButton isDraft={ isDraft } url={ url } /> }
    </>
  );
};

export default Injector;
