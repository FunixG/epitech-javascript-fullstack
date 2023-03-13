import { configureStore } from '@reduxjs/toolkit';
import { reducerPopup } from './reducer';

const store = configureStore({
  reducer: reducerPopup,
});

export type AppDispatch = typeof store.dispatch;
export default store;
