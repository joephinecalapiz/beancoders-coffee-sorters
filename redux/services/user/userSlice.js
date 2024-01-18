import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDetails } from './userActions';

// initialize role from local storage
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : []

// console.log(customers)
// console.log(storedUserInfo.details[0])

const initialState = {
    userInfo,
    companyInfo: '',
    status: 'idle',
    error: null,
};

const userInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //user
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
                state.companyInfo = action.payload.details[0];
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default userInfoSlice.reducer;
