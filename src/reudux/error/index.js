import * as types from './types';

const initState = {
  message: null,
  type: null
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_ERROR: {
      return {
        ...state,
        message: action.errorMessage,
        type: action.errorType
      };
    }
    case types.CLEAR_ERROR: {
      return {
        ...state,
        message: null,
        type: null
      };
    }
    default:
      return state;
  }
};

export default errorReducer;
