import { createSlice } from '@reduxjs/toolkit';
import { updatedStatusInfo, addStatusInfo, fetchStatusInfo } from './statusAction';

const storedStatus = JSON.parse(sessionStorage.getItem('storedStatus'));

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
            //status
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
            //add status
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
            //edit status
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
