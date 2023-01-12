import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Flex, IconButton } from '@strapi/design-system';
import { stopPropagation, useNotification } from '@strapi/helper-plugin';
import { ExternalLink, Link } from '@strapi/icons';

import { getTrad } from '../../utils';

const ListViewTableCell = ( { canCopy, isDraft, target, url } ) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  const handleClick = event => {
    if ( ! url ) {
      return;
    }

    window.open( url, target );
  };

  return (
    <Flex { ...stopPropagation }>
      <IconButton
        onClick={ handleClick }
        label={ formatMessage( isDraft ? {
          id: getTrad( 'form.button.draft' ),
          defaultMessage: 'Open draft preview',
        } : {
          id: getTrad( 'form.button.published' ),
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
                id: 'notification.success.link-copied',
                defaultMessage: 'Link copied to the clipboard',
              },
            } );
          } }
        >
          <IconButton
            icon={ <Link /> }
            label={ formatMessage( isDraft ? {
              id: getTrad( 'form.button.copy-link.draft' ),
              defaultMessage: 'Copy preview link',
            } : {
              id: getTrad( 'form.button.copy-link' ),
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
  canCopy: PropTypes.bool.isRequired,
  isDraft: PropTypes.bool.isRequired,
  target: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ListViewTableCell;
