import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { request, useNotification } from '@strapi/helper-plugin';

import { RESOLVE_DATA } from '../constants';
import { pluginId } from '../utils';

const fetchData = async ( uid, id, toggleNotification ) => {
  try {
    const endpoint = `/${pluginId}/${uid}/${id}`;
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

const usePreviewData = ( uid, id ) => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const data = useSelector( state => state[ pluginId ].data );
  const isLoading = useSelector( state => state[ pluginId ].isLoading );

  useEffect( () => {
    fetchData( uid, id, toggleNotification ).then( data => {
      dispatch( { type: RESOLVE_DATA, data } );
    } );
  }, [ dispatch, toggleNotification ] );

  return { data, isLoading };
};

export default usePreviewData;
