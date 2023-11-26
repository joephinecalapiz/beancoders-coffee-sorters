import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomerArchives } from './userActions';
import { addCustomerInfo } from './customerAction';

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

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //add customer
            .addCase(addCustomerInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCustomerInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload.customer;
            })
            .addCase(addCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
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

export default customerSlice.reducer;
