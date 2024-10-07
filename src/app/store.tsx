import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './slice/userSlice';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { message } from 'antd';


const userPersistConfig = {
  version: 0,
  key: 'user',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: () => {
        message.error("Error in Encryption of Login Data");
      },
    }),
  ],
}

const persistedUserReducer = persistReducer(userPersistConfig, userSlice)

const rootReducer = combineReducers({
  user: persistedUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 


