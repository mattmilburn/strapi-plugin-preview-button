import React from 'react';
import get from 'lodash/get';

import { ListViewColumn } from '../components';
import { pluginId } from '../utils';

const addPreviewColumn = ({ displayedHeaders, layout }) => {
  const uid = layout.contentType.uid;
  const supportFlagKeys = ['contentType', 'pluginOptions', pluginId, 'listViewColumn'];
  const isSupported = get(layout, supportFlagKeys, false) === true;
  const draftAndPublishKeys = ['contentType', 'options', 'draftAndPublish'];
  const hasDraftAndPublish = get(layout, draftAndPublishKeys, false) === true;

  // Do nothing if the preview button column is not supported or disabled for this UID.
  if (!isSupported) {
    return {
      displayedHeaders,
      layout,
    };
  }

  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        key: '__preview_key__',
        fieldSchema: {
          type: 'string',
        },
        metadatas: {
          label: 'Preview',
          searchable: false,
          sortable: false,
        },
        name: 'preview',
        cellFormatter: (data) => {
          const isDraft = hasDraftAndPublish && !data?.publishedAt;

          return <ListViewColumn uid={uid} data={data} isDraft={isDraft} />;
        },
      },
    ],
    layout,
  };
};

export default addPreviewColumn;
