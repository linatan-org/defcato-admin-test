import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import errorReducer from './error';
import keyboardReducer from './keyboard';
import globalLoaderReducer from './globalLoader';
import settingsReducer from './settings';
import authReducer from './auth';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['keyboard', 'settings', 'auth'],
  blacklist: ['error'],
  timeout: null
};

const rootReducer = combineReducers({
  error: errorReducer,
  keyboard: keyboardReducer,
  globalLoader: globalLoaderReducer,
  settings: settingsReducer,
  auth: authReducer
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
