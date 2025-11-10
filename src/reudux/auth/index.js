import * as types from './types';

const initState = {
  isAuth: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload
      };
    }
    default:
      return state;
  }
};

export default authReducer;
