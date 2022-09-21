import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { usePluginConfig } from '../../hooks';
import { pluginId } from '../../utils';

const Initializer = ( { setPlugin } ) => {
  const ref = useRef();

  // Load the plugin config ASAP.
  const { isLoading } = usePluginConfig();

  ref.current = setPlugin;

  useEffect( () => {
    if ( ! isLoading ) {
      ref.current( pluginId );
    }
  }, [ isLoading ] );

  return null;
};

Initializer.propTypes = {
  setPlugin: PropTypes.func.isRequired,
};

export default Initializer;
