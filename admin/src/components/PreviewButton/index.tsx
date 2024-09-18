import { LinkButton } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { type PreviewButtonStateConfig } from '../../../../server/src/config';
import { getTrad } from '../../utils';

export interface PreviewButtonProps extends PreviewButtonStateConfig {
  isDraft: boolean;
}

const PreviewButton = ({ isDraft, openTarget, url }: PreviewButtonProps) => {
  const { formatMessage } = useIntl();

  const handleClick = useCallback(
    (event: Event) => {
      event.preventDefault();

      if (!url) {
        return
      };

      window.open(url, openTarget);
    },
    [url, openTarget]
  );

  return (
    <LinkButton
      href={url}
      target="_blank"
      onClick={handleClick}
      size="S"
      startIcon={<ExternalLink />}
      variant="secondary"
      style={{ width: '100%' }}
      disabled={!url}
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
    </LinkButton>
  );
};

export default memo(PreviewButton);
