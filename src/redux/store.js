import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

// Import reducer kita
import authReducer from './slices/authSlice.js';
import linkReducer from './slices/linkSlice.js';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isLoading', 'error'], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  links: linkReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    });
  },
});

export const persistor = persistStore(store);