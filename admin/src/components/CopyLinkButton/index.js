import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@strapi/design-system';
import { useNotification } from '@strapi/helper-plugin';
import { Link } from '@strapi/icons';
import { getTrad } from '../../utils';

const CopyLinkButton = ( { isDraft, draftUrl, publishedUrl } ) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  return (
    <CopyToClipboard
      text={ isDraft ? draftUrl : publishedUrl }
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
  draftUrl: PropTypes.string,
  publishedUrl: PropTypes.string,
};

export default CopyLinkButton;
