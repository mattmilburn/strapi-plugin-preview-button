import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@strapi/design-system';
import { Link as LinkIcon } from '@strapi/icons';
import { useNotification } from '@strapi/strapi/admin';

import { getTrad } from '../../utils';

export interface CopyLinkButtonProps {
  isDraft: boolean;
  url: string;
}

const CopyLinkButton = ({ isDraft, url }: CopyLinkButtonProps) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();

  const handleOnCopy = useCallback(() => {
    toggleNotification({
      type: 'success',
      message: formatMessage({
        id: 'notification.success.link-copied',
        defaultMessage: 'Link copied to the clipboard',
      }),
    });
  }, [formatMessage, toggleNotification]);

  return (
    <CopyToClipboard text={url} onCopy={handleOnCopy}>
      <Button size="S" startIcon={<LinkIcon />} variant="secondary" style={{ width: '100%' }}>
        {formatMessage(
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
      </Button>
    </CopyToClipboard>
  );
};

export default memo(CopyLinkButton);
