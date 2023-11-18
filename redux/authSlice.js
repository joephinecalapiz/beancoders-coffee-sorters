import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

// initialize userToken from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

// initialize role from local storage
const role = localStorage.getItem('role')
  ? localStorage.getItem('role')
  : null

// initialize role from local storage
const user_id = localStorage.getItem('user_id')
  ? localStorage.getItem('user_id')
  : null


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    token,
    role,
    user_id,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token') // deletes token from storage
      localStorage.removeItem('role') // deletes token from storage
      localStorage.removeItem('user_id') // deletes token from storage
      state.loading = false
      state.user = null
      state.token = null
      state.error = null
      state.role = null
      state.user_id = null
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
        state.user_id = action.payload.user.id; // Assuming the payload contains a role
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Now the payload contains the error message
      });
  },
});

export const { logout } = authSlice.actions
export default authSlice.reducer;
