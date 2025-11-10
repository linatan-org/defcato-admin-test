import * as types from './types';

export const setDashboardAccessOnly = (access) => ({
  type: types.SET_IS_DASHBOARD_ONLY,
  payload: access
});

export const setTechnicalSupportAccess = (access) => ({
  type: types.SET_IS_TECHNICAL_SUPPORT,
  payload: access
});
