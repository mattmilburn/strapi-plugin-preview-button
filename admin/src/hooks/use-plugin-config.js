import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchClient } from '@strapi/helper-plugin';

import { ACTION_RESOLVE_CONFIG } from '../constants';
import { pluginId } from '../utils';

const usePluginConfig = () => {
  const dispatch = useDispatch();
  const fetchClient = useFetchClient();
  const { config, isLoading } = useSelector((state) => state[`${pluginId}_config`]);

  useEffect(() => {
    // Do nothing if we have already loaded the data.
    if (!isLoading && !!config) {
      return;
    }

    fetchClient.get(`/${pluginId}/config`).then((res) => {
      dispatch({
        type: ACTION_RESOLVE_CONFIG,
        data: res?.data?.config ?? {},
      });
    });
  }, [isLoading, config, fetchClient, dispatch]);

  return {
    data: config,
    isLoading,
  };
};

export default usePluginConfig;
