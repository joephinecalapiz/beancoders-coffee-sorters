// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth/authSlice';
import userReducer from './services/user/userSlice';
import customerReducer from './services/customer/customerSlice';
import sorterReducer from './services/sorter/sorterSlice';
import statusReducer from './services/status/statusSlice';
import { authApi } from './services/api/authService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    sorter: sorterReducer,
    statusInfo: statusReducer,
    [authApi.reducerPath]: authApi.reducer,
    // Add other reducers as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
