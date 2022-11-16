import { useEffect, useState } from 'react';

import { usePluginConfig} from '../hooks';
import { parseUrl } from '../utils';

const usePreviewUrl = ( uid, data, isDraft, isCreating ) => {
  const [ url, setUrl ] = useState( null );
  const [ canCopy, setCopy ] = useState( true );
  const { config, isLoading } = usePluginConfig();
  const { contentTypes } = config;

  const { updatedAt } = data;

  const match = contentTypes?.find( type => type.uid === uid );
  const isSupportedType = !! match;

  useEffect( () => {
    if ( isLoading || isCreating || ! isSupportedType ) {
      return;
    }

    const stateConfig = match[ isDraft ? 'draft' : 'published' ];
    const url = parseUrl( stateConfig, data );

    if ( ! url ) {
      return;
    }

    setUrl( url );
    setCopy( stateConfig?.copy === false ? false : true );
  }, [ isDraft, isCreating, isLoading, updatedAt ] );

  return {
    canCopy,
    isLoading,
    isSupportedType,
    url,
  };
};

export default usePreviewUrl;
