import React from 'react';

import ListViewTableCell from '../components/ListViewTableCell';
import { parseUrl } from '../utils';

const addPreviewColumn = ({ displayedHeaders, layout }, pluginConfig) => {
  const { contentTypes, injectListViewColumn, openTarget } = pluginConfig;
  const uidConfig = contentTypes?.find((type) => type.uid === layout.contentType.uid);
  const isSupported = !!uidConfig;

  // Do nothing if this feature is not a supported type for the preview button.
  if (!isSupported || !injectListViewColumn) {
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
          const hasDraftAndPublish = layout.contentType.options.draftAndPublish === true;
          const isDraft = hasDraftAndPublish && !data.publishedAt;
          const configFromState = isSupported && uidConfig[isDraft ? 'draft' : 'published'];
          const url = parseUrl(configFromState, data);

          if (!url) {
            return null;
          }

          return (
            <ListViewTableCell
              canCopy={configFromState?.copy === false ? false : true}
              isDraft={isDraft}
              target={openTarget}
              url={url}
            />
          );
        },
      },
    ],
    layout,
  };
};

export default addPreviewColumn;
