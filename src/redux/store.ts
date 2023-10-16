
import { configureStore } from '@reduxjs/toolkit';
import LayoutReducer from './Slices/layout/Layout';
import AuthReducer from './Slices/auth/Auth';
import Utiltities from './Slices/utiltities/Utiltities';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';


const persistConfig = {
  key: 'root',
  storage: localStorage,

};
const AuthpersistedReducer = persistReducer(persistConfig, AuthReducer);
const LayoutpersistedReducer = persistReducer(persistConfig, LayoutReducer);
const UtiltitiespersistedReducer = persistReducer(persistConfig, Utiltities);

const reducer = {
  Layout: LayoutpersistedReducer,
  Auth: AuthpersistedReducer,
  utiltities: UtiltitiespersistedReducer

};


export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;