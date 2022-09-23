import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';

import { PREVIEW_WINDOW_NAME } from '../../constants';
import { getTrad } from '../../utils';

const ListViewTableCell = ( { isDraft, url } ) => {
  const { formatMessage } = useIntl();

  const handleClick = event => {
    if ( ! url ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    window.open( url, PREVIEW_WINDOW_NAME );
  };

  return (
    <Button
      size="S"
      startIcon={ <ExternalLink /> }
      variant="secondary"
      onClick={ handleClick }
    >
      { formatMessage( isDraft ? {
        id: getTrad( 'label.open-preview-link' ),
        defaultMessage: 'Open preview',
      } : {
        id: getTrad( 'label.open-link' ),
        defaultMessage: 'Open link',
      } ) }
    </Button>
  );
};

ListViewTableCell.propTypes = {
  isDraft: PropTypes.bool,
  url: PropTypes.string,
};

export default ListViewTableCell;
