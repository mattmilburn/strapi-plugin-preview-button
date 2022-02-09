import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { request, useNotification } from '@strapi/helper-plugin';

import pluginId from '../pluginId';
import { RESOLVE_UIDS } from '../constants';

const fetchUIDs = async ( toggleNotification ) => {
  try {
    const endpoint = `/${pluginId}/uids`;
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

const useSupportedUIDs = ( uid, id ) => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const uids = useSelector( state => state[ `${pluginId}_config` ].uids );
  const isLoading = useSelector( state => state[ `${pluginId}_config` ].isLoading );

  useEffect( () => {
    fetchUIDs( toggleNotification ).then( data => {
      dispatch( { type: RESOLVE_UIDS, data } );
    } );
  }, [ dispatch, toggleNotification ] );

  return { uids, isLoading };
};

export default useSupportedUIDs;
