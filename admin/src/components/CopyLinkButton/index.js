import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@strapi/design-system';
import { useNotification } from '@strapi/helper-plugin';
import { Link } from '@strapi/icons';
import { getTrad } from '../../utils';

const CopyLinkButton = ( { isDraft, url } ) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  return (
    <CopyToClipboard
      text={ url }
      onCopy={ () => {
        toggleNotification( {
          type: 'success',
          message: {
            id: 'notification.link-copied',
            defaultMessage: 'Link copied to the clipboard',
          },
        } );
      } }
    >
      <Button
        size="S"
        startIcon={ <Link /> }
        variant="secondary"
        style={ { width: '100%' } }
      >
        { formatMessage( isDraft ? {
          id: getTrad( 'label.copy-preview-link' ),
          defaultMessage: 'Copy preview link',
        } : {
          id: getTrad( 'label.copy-link' ),
          defaultMessage: 'Copy link',
        } ) }
      </Button>
    </CopyToClipboard>
  );
};

CopyLinkButton.propTypes = {
  isDraft: PropTypes.bool,
  url: PropTypes.string,
};

export default memo( CopyLinkButton );
