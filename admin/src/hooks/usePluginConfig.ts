import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAPIErrorHandler, useFetchClient, useNotification } from '@strapi/strapi/admin';

import { type PreviewButtonPluginConfig } from '../../../server/src/config';
import { ACTION_RESOLVE_CONFIG, PLUGIN_ID } from '../constants';

export interface UsePluginConfigReturn {
  data: PreviewButtonPluginConfig;
  isLoading: boolean;
}

const usePluginConfig = (): UsePluginConfigReturn => {
  const { formatAPIError } = useAPIErrorHandler();
  const dispatch = useDispatch();
  const fetchClient = useFetchClient();
  const { toggleNotification } = useNotification();
  const { config, isLoading } = useSelector((state: any) => state[`${PLUGIN_ID}_config`]);

  useEffect(() => {
    // Do nothing if we have already loaded the data.
    if (!isLoading && !!config) {
      return;
    }

    fetchClient
      .get(`/${PLUGIN_ID}/config`)
      .then(({ data }: any) => {
        dispatch({
          type: ACTION_RESOLVE_CONFIG,
          data,
        });
      })
      .catch((err: any) => {
        if ('code' in err && err?.code === 'ERR_CANCELED') {
          return;
        }

        toggleNotification({
          type: 'warning',
          message: formatAPIError(err),
        });
      });
  }, [isLoading, config, dispatch, fetchClient, formatAPIError, toggleNotification]);

  return {
    data: config,
    isLoading,
  };
};

export default usePluginConfig;
