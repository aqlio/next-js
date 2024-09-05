// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import classReducer from './classSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        class: classReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;