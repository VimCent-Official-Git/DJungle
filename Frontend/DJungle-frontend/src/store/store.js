import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import djReducer from '../features/dj/djSlice';
import clientReducer from '../features/client/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dj: djReducer,
    client: clientReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});