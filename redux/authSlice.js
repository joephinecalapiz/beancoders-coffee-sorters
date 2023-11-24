import { createSlice } from '@reduxjs/toolkit';
import { companyDetails, loginUser, registerUser } from './authActions';
import Cookies from 'js-cookie'
import localhost_domain from '../src/cookie';

// initialize userToken from local storage
const token = Cookies.get('tk')
  ? Cookies.get('tk')
  : null

// initialize role from local storage
const role = Cookies.get('rl')
  ? Cookies.get('rl')
  : null

// initialize role from local storage
const user_id = Cookies.get('uid')
  ? Cookies.get('uid')
  : null


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    details: null,
    token,
    role,
    user_id,
    error: null,
    success: false,
    companyName: null
  },
  reducers: {
    logout: (state) => {
      // localStorage.removeItem('token') // deletes token from storage
      // localStorage.removeItem('role') // deletes token from storage
      // localStorage.removeItem('user_id') // deletes token from storage
      Cookies.remove('tk')
      Cookies.remove('rl')
      Cookies.remove('uid')
      Cookies.set('isLoggedIn', false, { domain: localhost_domain, sameSite: 'strict'})
      state.loading = false
      state.user = null
      state.token = null
      state.details = null
      state.error = null
      state.role = null
      state.user_id = null
    },
    setCredentials: (state, { payload }) => {
      state.user = payload
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true // login successful
        state.user = action.payload.user; // Assuming the payload contains user data
        state.token = action.payload.token; // Assuming the payload contains a token
        state.role = action.payload.user.role; // Assuming the payload contains a role
        state.user_id = action.payload.user.id; // Assuming the payload contains a id
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Now the payload contains the error message
      })
      //register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true // registration successful
        state.user = action.payload.user; // Assuming the payload contains user data
        state.token = action.payload.token; // Assuming the payload contains a token
        state.role = action.payload.user.role; // Assuming the payload contains a role
        state.user_id = action.payload.user.id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Now the payload contains the error message
      })
      //company
      .addCase(companyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true // registration successful
        state.details = action.payload.details; // Assuming the payload contains user data
      })
      .addCase(companyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Now the payload contains the error message
      });
  },
});

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer;
