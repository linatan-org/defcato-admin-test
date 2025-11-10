import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';

export const setError = (errorType, errorMessage) => ({
  type: types.SET_ERROR,
  errorType,
  errorMessage,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});

export const refreshToken = () => dispatch => {
  const {user} = store.getState().auth;
  const {navigation} = store.getState().settings;
};

export const runError = (
  errorType,
  errorMessage,
  func = () => {},
) => dispatch => {
  dispatch(setError(errorType, errorMessage));
};
