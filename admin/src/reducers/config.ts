import produce from 'immer';

import { type PreviewButtonPluginConfig } from '../../../server/src/config';
import { ACTION_RESOLVE_CONFIG } from '../constants';

const initialState: PreviewButtonPluginConfig = {
  contentTypes: null,
};

const configReducer = produce((previousState, action) => {
  let state = previousState ?? initialState;

  switch (action.type) {
    case ACTION_RESOLVE_CONFIG:
      state.isLoading = false;
      state.config = action.data.config;
      break;

    default:
      return state;
  }

  return state;
});

export default configReducer;
