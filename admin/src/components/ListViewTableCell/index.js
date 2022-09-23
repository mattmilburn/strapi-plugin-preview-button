import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Flex, IconButton } from '@strapi/design-system';
import { stopPropagation, useNotification } from '@strapi/helper-plugin';
import { ExternalLink, Link } from '@strapi/icons';

import { PREVIEW_WINDOW_NAME } from '../../constants';
import { getTrad } from '../../utils';

const ListViewTableCell = ( { canCopy, isDraft, url } ) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  const handleClick = event => {
    if ( ! url ) {
      return;
    }

    window.open( url, PREVIEW_WINDOW_NAME );
  };

  return (
    <Flex { ...stopPropagation }>
      <IconButton
        onClick={ handleClick }
        label={ formatMessage( isDraft ? {
          id: getTrad( 'label.draft' ),
          defaultMessage: 'Open draft preview',
        } : {
          id: getTrad( 'label.published' ),
          defaultMessage: 'Open live view',
        } ) }
        icon={ <ExternalLink /> }
        noBorder
      />
      { canCopy && (
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
          <IconButton
            icon={ <Link /> }
            label={ formatMessage( isDraft ? {
              id: getTrad( 'label.copy-preview-link' ),
              defaultMessage: 'Copy preview link',
            } : {
              id: getTrad( 'label.copy-link' ),
              defaultMessage: 'Copy link',
            } ) }
            noBorder
          />
        </CopyToClipboard>
      ) }
    </Flex>
  );
};

ListViewTableCell.propTypes = {
  canCopy: PropTypes.bool,
  isDraft: PropTypes.bool,
  url: PropTypes.string,
};

export default ListViewTableCell;
