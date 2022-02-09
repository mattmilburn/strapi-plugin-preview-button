import produce from 'immer';

import { RESOLVE_UIDS } from '../constants';

const initialState = {
  isLoading: true,
  uids: [],
};

const configReducer = produce( ( state = initialState, action ) => {
  switch ( action.type ) {
    case RESOLVE_UIDS: {
      state.isLoading = false;
      state.uids = action.data;
      break;
    }

    default:
      return state;
  }

  return state;
} );

export default configReducer;
