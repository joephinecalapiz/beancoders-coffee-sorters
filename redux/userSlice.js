import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails } from './userActions';

// initialize role from local storage
const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  ? JSON.parse(sessionStorage.getItem('userInfo'))
  : null

const initialState = {
    userInfo: storedUserInfo,
    status: 'idle',
    error: null,
};

const companySlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default companySlice.reducer;
