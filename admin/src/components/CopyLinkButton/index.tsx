import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { Button } from '@strapi/design-system';
import { Link as LinkIcon } from '@strapi/icons';
import { useNotification } from '@strapi/strapi/admin';

import { getTrad } from '../../utils';

export interface CopyLinkButtonProps {
  isDraft: boolean;
  url: string;
}

const ButtonStyled = styled(Button)`
  width: 100%;
`;

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
      <ButtonStyled size="S" startIcon={<LinkIcon />} variant="secondary">
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
      </ButtonStyled>
    </CopyToClipboard>
  );
};

export default memo(CopyLinkButton);
