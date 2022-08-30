import * as types from './types';

const initState = {
  loading: false
};

const globalLoaderReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }
    default:
      return state;
  }
};

export default globalLoaderReducer;
