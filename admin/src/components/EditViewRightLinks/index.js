import React from 'react';
import { useSelector } from 'react-redux';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewUrl } from '../../hooks';
import { pluginId } from '../../utils';
import { CopyLinkButton, PreviewButton } from '../';

const EditViewRightLinks = () => {
  const {
    allLayoutData,
    hasDraftAndPublish,
    isCreatingEntry,
    modifiedData,
  } = useCMEditViewDataManager();
  const { openTarget } = useSelector( state => state[ `${pluginId}_config` ].config );
  const isDraft = hasDraftAndPublish && ! modifiedData?.publishedAt;
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
      <PreviewButton isDraft={ isDraft } url={ url } target={ openTarget } />
      { canCopy && <CopyLinkButton isDraft={ isDraft } url={ url } /> }
    </>
  );
};

export default EditViewRightLinks;
