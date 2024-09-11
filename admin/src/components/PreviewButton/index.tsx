import { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';

import { type PreviewButtonStateConfig } from '../../../../server/src/config';
import { getTrad } from '../../utils';

export interface PreviewButtonProps extends PreviewButtonStateConfig {
  isDraft: boolean;
}

const PreviewButton = ({ isDraft, openTarget, url }: PreviewButtonProps) => {
  const { formatMessage } = useIntl();

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

  return (
    <Button
      onClick={handleClick}
      size="S"
      startIcon={<ExternalLink />}
      variant="secondary"
      style={{ width: '100%' }}
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
    </Button>
  );
};

export default memo(PreviewButton);
