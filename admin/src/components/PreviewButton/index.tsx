import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { LinkButton } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';

import { type PreviewButtonStateConfig } from '../../../../server/src/config';
import { getTrad } from '../../utils';

export interface PreviewButtonProps extends PreviewButtonStateConfig {
  isDraft: boolean;
}

const LinkButtonStyled = styled(LinkButton)`
  width: 100%;

  // Fix visited state color for the icon.
  &:visited {
    color: ${({ theme }) => theme.colors.primary700};
  }
`;

const PreviewButton = ({ isDraft, openTarget, url }: PreviewButtonProps) => {
  const { formatMessage } = useIntl();

  const handleClick = useCallback(
    (event: Event) => {
      event.preventDefault();

      if (!url) {
        return;
      }

      window.open(url, openTarget);
    },
    [url, openTarget]
  );

  return (
    <LinkButtonStyled
      disabled={!url}
      href={url}
      onClick={handleClick}
      size="S"
      startIcon={<ExternalLink />}
      target="_blank"
      variant="secondary"
    >
      {formatMessage(
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
    </LinkButtonStyled>
  );
};

export default memo(PreviewButton);
