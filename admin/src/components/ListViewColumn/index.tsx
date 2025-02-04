import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import get from 'lodash/get';
import { type ListLayout } from '@strapi/content-manager/strapi-admin';
import { Flex, IconButton, IconButtonGroup, Loader } from '@strapi/design-system';
import { ExternalLink, Link } from '@strapi/icons';
import { type UID } from '@strapi/strapi';
import { useNotification } from '@strapi/strapi/admin';

import { PREVIEW_WINDOW_NAME } from '../../constants';
import { usePreviewButton } from '../../hooks';
import { getTrad } from '../../utils';

export interface ListViewColumnProps {
  data: any;
  layout: ListLayout;
  model: UID.ContentType;
}

const ListViewColumn = ({ data, layout, model }: ListViewColumnProps) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();

  const hasDraftAndPublish = layout.options.draftAndPublish === true;
  const isDraft = hasDraftAndPublish && data.status === 'draft';

  const { isLoading, draft, published } = usePreviewButton(model, data); // @TODO - Use model UID.

  const config = useMemo(() => {
    if (isDraft) {
      return draft;
    }

    return published;
  }, [isDraft, draft, published]);

  const url = get(config, 'url', '');
  const copy = get(config, 'copy');
  const openTarget = get(config, 'openTarget', PREVIEW_WINDOW_NAME);

  const handleOpenLink = useCallback(
    (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!url) {
        return;
      }

      window.open(url, openTarget);
    },
    [url, openTarget]
  );

  const handleCopy = useCallback(() => {
    toggleNotification({
      type: 'success',
      message: formatMessage({
        id: 'notification.success.link-copied',
        defaultMessage: 'Link copied to the clipboard',
      }),
    });
  }, [formatMessage, toggleNotification]);

  if (isLoading) {
    return (
      <Flex>
        <Loader small />
      </Flex>
    );
  }

  return (
    <IconButtonGroup>
      <IconButton
        onClick={handleOpenLink}
        label={formatMessage(
          isDraft
            ? {
                id: getTrad('form.button.draft'),
                defaultMessage: 'Open draft preview',
              }
            : {
                id: getTrad('form.button.published'),
                defaultMessage: 'Open live view',
              }
        )}
        noBorder
      >
        <ExternalLink />
      </IconButton>
      {copy && (
        <CopyToClipboard text={url} onCopy={handleCopy}>
          <IconButton
            onClick={(event: Event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            label={formatMessage(
              isDraft
                ? {
                    id: getTrad('form.button.copy-link.draft'),
                    defaultMessage: 'Copy preview link',
                  }
                : {
                    id: getTrad('form.button.copy-link'),
                    defaultMessage: 'Copy link',
                  }
            )}
            noBorder
          >
            <Link />
          </IconButton>
        </CopyToClipboard>
      )}
    </IconButtonGroup>
  );
};

export default ListViewColumn;
