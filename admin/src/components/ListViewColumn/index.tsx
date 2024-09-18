import { Flex, IconButton, Loader } from '@strapi/design-system';
import { ExternalLink, Link as LinkIcon } from '@strapi/icons';
import { UID } from '@strapi/strapi';
import { useNotification } from '@strapi/strapi/admin';
import get from 'lodash/get';
import { useCallback, useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIntl } from 'react-intl';

import { PREVIEW_WINDOW_NAME } from '../../constants';
import { usePreviewButton } from '../../hooks';
import { getTrad } from '../../utils';

export interface ListViewColumnProps {
  data: any;
  layout: {
    contentType: {
      uid: UID.ContentType | undefined;
      options: {
        draftAndPublish: boolean;
      };
      pluginOptions: {
        [pluginId: string]: {
          listViewColumn: boolean;
        };
      };
    };
  };
}

const ListViewColumn = ({ data, layout }: ListViewColumnProps) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();

  const hasDraftAndPublish = layout.contentType.options.draftAndPublish === true;
  const isDraft = hasDraftAndPublish && !data?.publishedAt;

  const { isLoading, draft, published } = usePreviewButton(layout.contentType.uid, data);

  const config = useMemo(() => {
    if (isDraft) {
      return draft;
    }

    return published;
  }, [isDraft, draft, published]);

  const url = get(config, 'url', '');
  const copy = get(config, 'copy');
  const openTarget = get(config, 'openTarget', PREVIEW_WINDOW_NAME);

  const handleClick = useCallback(
    (event: Event) => {
      if (!url) {
        event.preventDefault();

        return;
      }

      window.open(url, openTarget);
    },
    [url, openTarget]
  );

  const handleOnCopy = useCallback(() => {
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
    <Flex>
      <IconButton
        onClick={handleClick}
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
        icon={<ExternalLink />}
        noBorder
      />
      {copy && (
        <CopyToClipboard text={url} onCopy={handleOnCopy}>
          <IconButton
            icon={<LinkIcon />}
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
          />
        </CopyToClipboard>
      )}
    </Flex>
  );
};

export default ListViewColumn;
