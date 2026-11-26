import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/store/reducers';
import { thunk } from 'redux-thunk';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat( thunk )
  });
};
