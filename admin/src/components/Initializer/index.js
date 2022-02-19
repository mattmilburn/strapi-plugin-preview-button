import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useSupportedUIDs } from '../../hooks';
import { pluginId } from '../../utils';

const Initializer = ( { setPlugin } ) => {
  const { data, isLoading } = useSupportedUIDs();
  const ref = useRef();

  ref.current = setPlugin;

  useEffect( () => {
    const uids = data?.uids ?? [];

    if ( ! isLoading && uids.length > 0 ) {
      ref.current( pluginId );
    }
  }, [ data, isLoading ] );

  return null;
};

Initializer.propTypes = {
  setPlugin: PropTypes.func.isRequired,
};

export default Initializer;
