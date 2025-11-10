import * as types from './types';

const initState = {
  keyboardList: []
};

const keyboard = (state = initState, action) => {
  switch (action.type) {
    case types.SAVE_KEYBOARD_LIST: {
      return {
        ...state,
        keyboardList: action.payload
      };
    }
    default:
      return state;
  }
};

export default keyboard;
