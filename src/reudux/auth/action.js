import * as types from './types';

export const setAuth = (isAuth) => ({
  type: types.SET_AUTH,
  payload: isAuth
});
