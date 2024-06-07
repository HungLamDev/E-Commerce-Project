<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import userSlice from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token"],
=======
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Common configuration for redux-persist
const commonConfig = {
  key: 'shop/user',
  storage
};

// Specific configuration for the user slice
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
>>>>>>> 36c200716be40d1395259e9d88a4e5beb09155a7
};

// Create a persisted reducer for the user slice
const persistedReducer = persistReducer(userConfig, userSlice);

// Configure the store with the persisted reducer and custom middleware
const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistedReducer,
  },
<<<<<<< HEAD
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
=======
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    },
  }),
>>>>>>> 36c200716be40d1395259e9d88a4e5beb09155a7
});

// Create the persistor
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };
