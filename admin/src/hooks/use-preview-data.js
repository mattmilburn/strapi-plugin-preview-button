import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { request, useNotification } from '@strapi/helper-plugin';

import { RESOLVE_PREVIEW } from '../constants';
import { pluginId } from '../utils';

const fetchData = async ( uid, id, toggleNotification ) => {
  try {
    let endpoint = `/${pluginId}/${uid}`;

    // Optional ID to support single types.
    if ( id ) {
      endpoint = `${endpoint}/${id}`;
    }

    const data = await request( endpoint, { method: 'GET' } );

    return data;
  } catch ( err ) {
    toggleNotification( {
      type: 'warning',
      message: { id: 'notification.error' },
    } );

    return err;
  }
};

const usePreviewData = ( uid, id, isCreatingEntry, fetchDependencies = [] ) => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const data = useSelector( state => state[ pluginId ].data );
  const isLoading = useSelector( state => state[ pluginId ].isLoading );
  const { contentTypes } = useSelector( state => state[ `${pluginId}_config` ].config );

  const isSupportedType = contentTypes && contentTypes.includes( uid );

  useEffect( () => {
    if ( ! isSupportedType || isCreatingEntry ) {
      return;
    }

    fetchData( uid, id, toggleNotification ).then( data => {
      dispatch( { type: RESOLVE_PREVIEW, data } );
    } );
  }, [ dispatch, toggleNotification, ...fetchDependencies ] );

  return {
    data,
    isLoading,
    isSupportedType,
  };
};

export default usePreviewData;
