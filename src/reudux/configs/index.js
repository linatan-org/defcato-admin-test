import * as types from './types';

const initState = {
  mainButtons: {},
  mainUrls: {},
  IsSelectVendorRequired: false,
  IsItemQueryEnable: false,
  lang: 'he'
};

const configsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_MAIN_BUTTONS: {
      return {
        ...state,
        mainButtons: action.payload
      };
    }
    case types.SET_MAIN_IMAGE_URLS: {
      return {
        ...state,
        mainUrls: action.payload
      };
    }
    case types.CHANGE_LANG: {
      return {
        ...state,
        lang: action.payload
      };
    }
    default:
      return state;
  }
};

export default configsReducer;
