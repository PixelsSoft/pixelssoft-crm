import { configureStore } from '@reduxjs/toolkit';
import PageTitleReducer from './Slices/PageTitle';


const reducer = {
    PageTitle: PageTitleReducer,

};

export const store = configureStore( {
    reducer: reducer,
    devTools: true,
} );

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;