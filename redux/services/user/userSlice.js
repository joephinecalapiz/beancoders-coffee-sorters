import { createSlice } from '@reduxjs/toolkit';
import { fetchSorterInfo, fetchStatusInfo, fetchUserDetails } from './userActions';

// initialize role from local storage
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : []

const sorters = JSON.parse(sessionStorage.getItem('sorterData'))
    ? JSON.parse(sessionStorage.getItem('sorterData'))
    : []

const statusInfo = JSON.parse(sessionStorage.getItem('statusData'))
    ? JSON.parse(sessionStorage.getItem('statusData'))
    : []

// console.log(customers)
// console.log(storedUserInfo.details[0])

const initialState = {
    userInfo,
    companyInfo: '',
    sorters,
    statusInfo,
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
            //sorter
            .addCase(fetchSorterInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSorterInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sorters = action.payload.sorters;
            })
            .addCase(fetchSorterInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //status
            .addCase(fetchStatusInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStatusInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.statusInfo = action.payload.status;
            })
            .addCase(fetchStatusInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default userInfoSlice.reducer;
