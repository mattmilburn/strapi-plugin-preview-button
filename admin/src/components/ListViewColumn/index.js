import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Loader } from '@strapi/design-system/Loader';
import { stopPropagation, useNotification } from '@strapi/helper-plugin';
import ExternalLink from '@strapi/icons/ExternalLink';
import LinkIcon from '@strapi/icons/Link';

import { usePreviewButton } from '../../hooks';
import { getTrad } from '../../utils';

const ListViewColumn = ({ uid, data, isDraft }) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { canCopy, isLoading, openTarget, url } = usePreviewButton(uid, data, isDraft, false);

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

  if (isLoading) {
    return (
      <Flex {...stopPropagation}>
        <Loader small={true} />
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
      {canCopy && (
        <CopyToClipboard
          text={url}
          onCopy={() => {
            toggleNotification({
              type: 'success',
              message: {
                id: 'notification.success.link-copied',
                defaultMessage: 'Link copied to the clipboard',
              },
            });
          }}
        >
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
  uid: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isDraft: PropTypes.bool.isRequired,
};

export default ListViewColumn;
