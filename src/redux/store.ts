// import { createStore, compose, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import reducers from "./reducers";
// import rootSaga from "./sagas";

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];
// let store: any;

// export function configureStore(initialState: {}) {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//   const localstore = createStore(
//     reducers,
//     initialState,
//     composeEnhancers(applyMiddleware(...middlewares))
//   );
//   sagaMiddleware.run(rootSaga);
//   store = localstore;
//   return localstore;
// }

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import LayoutReducer from './Slices/layout/Layout';
import AuthReducer from './Slices/auth/Auth';


const reducer = {
  Layout: LayoutReducer,
  Auth: AuthReducer

};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;