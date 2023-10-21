
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import LayoutReducer from './Slices/layout/Layout';
import AuthReducer from './Slices/auth/Auth';
import Utiltities from './Slices/utiltities/Utiltities';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';


const persistConfig = {
  key: 'root',
  storage: localStorage,

};

const reducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  utiltities: Utiltities

});

const persistedReducer = persistReducer(persistConfig, reducer);



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;