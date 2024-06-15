import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
}from 'redux-persist'

// Common configuration for redux-persist
const commonConfig = {
  key: 'shop/user',
  storage
};

// Specific configuration for the user slice
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current']
};

// Create a persisted reducer for the user slice
const persistedReducer = persistReducer(userConfig, userSlice);

// Configure the store with the persisted reducer and custom middleware
const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };
