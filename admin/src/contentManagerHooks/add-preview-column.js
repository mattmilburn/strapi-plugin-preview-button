import React from 'react';
import get from 'lodash/get';

import { ListViewColumn } from '../components';
import { pluginId } from '../utils';

const addPreviewColumn = ({ displayedHeaders, layout }) => {
  const supportKeys = ['contentType', 'pluginOptions', pluginId, 'listViewColumn'];
  const isSupported = get(layout, supportKeys, false) === true;

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
        cellFormatter: (data) => <ListViewColumn data={data} layout={layout} />,
      },
    ],
    layout,
  };
};

export default addPreviewColumn;
