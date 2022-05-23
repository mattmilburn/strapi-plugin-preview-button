import React from 'react';
import { useParams } from 'react-router-dom';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewData } from '../../hooks';
import { PreviewButton } from '../';

const Injector = () => {
  const {
    allLayoutData,
    hasDraftAndPublish,
    initialData,
    isCreatingEntry,
    modifiedData,
  } = useCMEditViewDataManager();
  const { id } = useParams();
  const { uid } = allLayoutData.contentType;
  const {
    data,
    isLoading,
    isSupportedType,
  } = usePreviewData( uid, id, isCreatingEntry, [ initialData ] );

  if ( ! isSupportedType || isCreatingEntry || isLoading || ! data || ! data?.urls ) {
    return null;
  }

  const { draftUrl, publishedUrl } = data.urls;
  const isDraft = hasDraftAndPublish && ! modifiedData.publishedAt;

  return (
    <PreviewButton
      isDraft={ isDraft }
      draftUrl={ draftUrl }
      publishedUrl={ publishedUrl }
    />
  );
};

export default Injector;
