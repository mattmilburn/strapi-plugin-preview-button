import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import pluginId from '../../pluginId';
import { useSupportedUIDs } from '../../hooks';

const Initializer = ( { setPlugin } ) => {
  const { uids, isLoading } = useSupportedUIDs();
  const ref = useRef();

  ref.current = setPlugin;

  useEffect( () => {
    if ( ! isLoading && uids.length > 0 ) {
      ref.current( pluginId );
    }
  }, [ isLoading, uids ] );

  return null;
};

Initializer.propTypes = {
  setPlugin: PropTypes.func.isRequired,
};

export default Initializer;
