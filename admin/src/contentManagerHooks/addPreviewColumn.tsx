import get from 'lodash/get';
import { type ListFieldLayout, type ListLayout } from '@strapi/content-manager/strapi-admin';
import { type Modules, type UID } from '@strapi/strapi';

import { ListViewColumn } from '../components';
import { PLUGIN_ID } from '../constants';
import { getTrad } from '../utils';

export interface AddPreviewColumnProps {
  displayedHeaders: ListFieldLayout[];
  layout: ListLayout;
}

const addPreviewColumn = ({ displayedHeaders, layout }: AddPreviewColumnProps) => {
  const isSupported = get(layout, ['options', PLUGIN_ID, 'listViewColumn'], false) === true;

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
        label: {
          id: getTrad('list-view.column-header'),
          defaultMessage: 'Preview',
        },
        name: 'preview',
        searchable: false,
        sortable: false,
        cellFormatter: (
          data: Modules.Documents.AnyDocument,
          _: any,
          { model }: { model: UID.ContentType }
        ) => <ListViewColumn data={data} layout={layout} model={model} />,
      },
    ],
    layout,
  };
};

export default addPreviewColumn;
