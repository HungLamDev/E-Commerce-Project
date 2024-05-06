import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const commonConfig = {
  key: 'shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
}

const persistedReducer = persistReducer(userConfig, userSlice);

const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistedReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
