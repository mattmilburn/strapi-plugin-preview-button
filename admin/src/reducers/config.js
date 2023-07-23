import produce from 'immer';

import { ACTION_RESOLVE_CONFIG, PREVIEW_WINDOW_NAME } from '../constants';

const initialState = {
  isLoading: true,
  config: {
    contentTypes: [],
    injectListViewColumn: false,
    openTarget: PREVIEW_WINDOW_NAME,
  },
};

const configReducer = produce((previousState, action) => {
  let state = previousState ?? initialState;

  switch (action.type) {
    case ACTION_RESOLVE_CONFIG:
      state.isLoading = false;
      state.config = action.data;
      break;

    default:
      return state;
  }

  return state;
});

export default configReducer;
