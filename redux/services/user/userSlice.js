import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomerArchives, fetchCustomerInfo, fetchSorterInfo, fetchStatusInfo, fetchUserDetails } from './userActions';

// initialize role from local storage
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : []

const customers = JSON.parse(sessionStorage.getItem('customerData'))
    ? JSON.parse(sessionStorage.getItem('customerData'))
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
    customers,
    sorters,
    statusInfo,
    archiveds: '',
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
                state.customers = action.payload.customer;
            })
            .addCase(fetchCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
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
            //archive customer
            .addCase(fetchCustomerArchives.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCustomerArchives.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.archiveds = action.payload.archiveds;
            })
            .addCase(fetchCustomerArchives.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userInfoSlice.reducer;
