// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './mainAppSlice';
import subscriptionReducer from './subscriptionSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    subscription: subscriptionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;