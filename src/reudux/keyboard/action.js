import * as types from './types';

export const saveKeyboardList = (list) => ({
  type: types.SAVE_KEYBOARD_LIST,
  payload: list
});
