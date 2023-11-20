// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import companyReducer from './companySlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    user: userReducer,
    // Add other reducers as needed
  },
});

export default store;
