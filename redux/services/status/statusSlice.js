import { createSlice } from '@reduxjs/toolkit';
import { updatedStatusInfo, addStatusInfo, fetchStatusInfo } from './statusAction';

// initialize role from session storage
// const customers = JSON.parse(sessionStorage.getItem('customerData'))
//     ? JSON.parse(sessionStorage.getItem('customerData'))
//     : []

const storedStatus = JSON.parse(sessionStorage.getItem('storedStatus'));

// const archivedData = JSON.parse(sessionStorage.getItem('userInfo'))
//     ? JSON.parse(sessionStorage.getItem('userInfo'))
//     : []

// const addCustomer = JSON.parse(sessionStorage.getItem('customerData'))
//     ? JSON.parse(sessionStorage.getItem('customerData'))
//     : []

const initialState = {
    allStatus: Array.isArray(storedStatus) ? storedStatus : [],
    status: 'idle',
    error: null,
};

const statuSlice = createSlice({
    name: 'statusInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //customer
            .addCase(fetchStatusInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStatusInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allStatus = action.payload.status;
            })
            .addCase(fetchStatusInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //add customer
            .addCase(addStatusInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addStatusInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allStatus = action.payload;
                //state.customers.push(action.payload)
            })
            .addCase(addStatusInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //edit customer
            .addCase(updatedStatusInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatedStatusInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allStatus = action.payload;
            })
            .addCase(updatedStatusInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default statuSlice.reducer;
