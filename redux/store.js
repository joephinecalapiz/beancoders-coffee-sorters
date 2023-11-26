// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth/authSlice';
import userReducer from './services/user/userSlice';
import { authApi } from './services/auth/authService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    // Add other reducers as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
