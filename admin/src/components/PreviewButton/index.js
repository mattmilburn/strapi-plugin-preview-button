import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';

import { getTrad } from '../../utils';

const PreviewButton = ( { isDraft, target, url } ) => {
  const { formatMessage } = useIntl();

  const handleClick = event => {
    if ( ! url ) {
      event.preventDefault();
      return;
    }

    window.open( url, target );
  };

  return (
    <Button
      onClick={ handleClick }
      size="S"
      startIcon={ <ExternalLink /> }
      variant="secondary"
      style={ { width: '100%' } }
    >
      { formatMessage( isDraft ? {
        id: getTrad( 'label.draft' ),
        defaultMessage: 'Open draft preview',
      } : {
        id: getTrad( 'label.published' ),
        defaultMessage: 'Open live view',
      } ) }
    </Button>
  );
};

PreviewButton.propTypes = {
  isDraft: PropTypes.bool,
  target: PropTypes.string,
  url: PropTypes.string,
};

export default memo( PreviewButton );
