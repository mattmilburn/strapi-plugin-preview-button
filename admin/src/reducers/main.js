import produce from 'immer';

import { RESOLVE_DATA } from '../constants';

const initialState = {
  isLoading: true,
  data: {},
};

const mainReducer = produce( ( state = initialState, action ) => {
  switch ( action.type ) {
    case RESOLVE_DATA: {
      state.isLoading = false;
      state.data = action.data;
      break;
    }

    default:
      return state;
  }

  return state;
} );

export default mainReducer;
