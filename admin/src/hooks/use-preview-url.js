import { useEffect, useState } from 'react';
import { useStrapiApp } from '@strapi/helper-plugin';

import { HOOK_BEFORE_BUILD_URL } from '../constants';
import { usePluginConfig } from '../hooks';
import { parseUrl } from '../utils';

const usePreviewUrl = ( uid, data, isDraft, isCreating ) => {
  const { runHookWaterfall } = useStrapiApp();
  const { config, isLoading } = usePluginConfig();
  const [ url, setUrl ] = useState( null );
  const [ canCopy, setCopy ] = useState( true );

  const { contentTypes } = config;

  const match = contentTypes?.find( type => type.uid === uid );
  const isSupportedType = !! match;

  useEffect( () => {
    if ( isLoading || isCreating || ! isSupportedType ) {
      return;
    }

    // Run async hook then set state.
    ( async () => {
      const stateFromConfig = match[ isDraft ? 'draft' : 'published' ];
      const { state } = await runHookWaterfall( HOOK_BEFORE_BUILD_URL, { state: stateFromConfig, data }, true );
      const url = parseUrl( state, data );

      if ( ! url ) {
        return;
      }

      setUrl( url );
      setCopy( state?.copy === false ? false : true );
    } )();
  }, [ isDraft, isCreating, isLoading, data ] );

  return {
    canCopy,
    isLoading,
    isSupportedType,
    url,
  };
};

export default usePreviewUrl;
