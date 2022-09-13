import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import errorReducer from './error';
import keyboardReducer from './keyboard';
import globalLoaderReducer from './globalLoader';
import settingsReducer from './settings';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['keyboard'],
  blacklist: ['error'],
  timeout: null
};

const rootReducer = combineReducers({
  error: errorReducer,
  keyboard: keyboardReducer,
  globalLoader: globalLoaderReducer,
  settings: settingsReducer
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
