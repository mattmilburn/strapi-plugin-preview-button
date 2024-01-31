import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import get from 'lodash/get';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Loader } from '@strapi/design-system/Loader';
import { stopPropagation, useNotification } from '@strapi/helper-plugin';
import ExternalLink from '@strapi/icons/ExternalLink';
import LinkIcon from '@strapi/icons/Link';

import { PREVIEW_WINDOW_NAME } from '../../constants';
import { usePreviewButton } from '../../hooks';
import { getTrad } from '../../utils';

const ListViewColumn = ({ data, layout }) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  const hasDraftAndPublish = layout.contentType.options.draftAndPublish === true;
  const isDraft = hasDraftAndPublish && !data?.publishedAt;

  const { isLoading, draft, published } = usePreviewButton(layout, data, isDraft, false);

  const config = useMemo(() => {
    if (isDraft) {
      return draft;
    }

    return published;
  }, [isDraft, draft, published]);

  const url = get(config, 'url');
  const copy = get(config, 'copy');
  const openTarget = get(config, 'openTarget', PREVIEW_WINDOW_NAME);

  const handleClick = useCallback(
    (event) => {
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
      message: {
        id: 'notification.success.link-copied',
        defaultMessage: 'Link copied to the clipboard',
      },
    });
  }, [toggleNotification]);

  if (isLoading) {
    return (
      <Flex {...stopPropagation}>
        <Loader small />
      </Flex>
    );
  }

  return (
    <Flex {...stopPropagation}>
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

ListViewColumn.propTypes = {
  data: PropTypes.object.isRequired,
  layout: PropTypes.shape({
    contentType: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      options: PropTypes.shape({
        draftAndPublish: PropTypes.bool,
      }),
      pluginOptions: PropTypes.shape({
        'preview-button': PropTypes.shape({
          listViewColumn: PropTypes.bool,
        }),
      }),
    }).isRequired,
  }).isRequired,
};

export default ListViewColumn;
