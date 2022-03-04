import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

import { usePreviewData } from '../../hooks';
import { pluginId } from '../../utils';
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
  const { contentTypes } = useSelector( state => state[ `${pluginId}_config` ].config );

  const isSupportedType = contentTypes && contentTypes.includes( uid );
  const shouldRender = isSupportedType && ! isCreatingEntry;

  if ( ! shouldRender ) {
    return null;
  }

  const { data, isLoading } = usePreviewData( uid, id, [ initialData ] );

  if ( isLoading || ! data || ! data?.urls ) {
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
