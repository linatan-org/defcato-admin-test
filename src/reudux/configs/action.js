import * as types from './types';

export const setMainButtons = (btnsConfigs) => ({
  type: types.SET_MAIN_BUTTONS,
  payload: btnsConfigs
});

export const setMainImagesUrls = (urls) => ({
  type: types.SET_MAIN_IMAGE_URLS,
  payload: urls
});

export const onChangeLang = (lang) => ({
  type: types.CHANGE_LANG,
  payload: lang
});
