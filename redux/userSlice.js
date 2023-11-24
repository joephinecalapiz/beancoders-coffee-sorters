import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomerInfo, fetchSorterInfo, fetchStatusInfo, fetchUserDetails } from './userActions';

// initialize role from local storage
const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : ''

// console.log(storedUserInfo)
// console.log(storedUserInfo.details[0])

const initialState = {
    userInfo: storedUserInfo,
    companyInfo: '',
    customers: null,
    sorters: null,
    statusInfo: null,
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
            //customer
            .addCase(fetchCustomerInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomerInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload.customer[0];
            })
            .addCase(fetchCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //sorter
            .addCase(fetchSorterInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSorterInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sorters = action.payload.sorters[0];
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
                state.statusInfo = action.payload.status[0];
            })
            .addCase(fetchStatusInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userInfoSlice.reducer;
