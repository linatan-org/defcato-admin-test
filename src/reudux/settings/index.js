import * as types from './types';

const initState = {
  isDashboardAccessOnly: false
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_IS_DASHBOARD_ONLY: {
      return {
        ...state,
        isDashboardAccessOnly: action.payload
      };
    }
    default:
      return state;
  }
};

export default settingsReducer;
