import { useEffect, useState } from 'react';
import qs from 'qs';

import { usePluginConfig} from '../hooks';
import { parseUrl, pluginId } from '../utils';

const usePreviewUrl = ( uid, data, isDraft, isCreating ) => {
  const [ url, setUrl ] = useState( null );
  const { config, isLoading } = usePluginConfig();
  const { contentTypes } = config;

  const match = contentTypes?.find( type => type.uid === uid );
  const isSupportedType = !! match;

  useEffect( () => {
    if ( isLoading || isCreating || ! isSupportedType ) {
      return;
    }

    const url = parseUrl( match[ isDraft ? 'draft' : 'published' ], data );

    if ( ! url ) {
      return;
    }

    setUrl( url );
  }, [ isLoading, isCreating ] );

  return {
    isLoading,
    isSupportedType,
    url,
  };
};

export default usePreviewUrl;
