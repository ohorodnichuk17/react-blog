import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accounts/accounts.slice.ts';

export const store = configureStore({
    reducer: {
        account: accountReducer
    },
});

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;