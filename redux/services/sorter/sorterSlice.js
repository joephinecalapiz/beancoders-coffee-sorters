import { createSlice } from '@reduxjs/toolkit';
import { updateSorterInfo, fetchSorterInfo, addSorterInfo } from './sorterAction';

const storedSorters = JSON.parse(sessionStorage.getItem('sorterData'));

const initialState = {
    sorterInfo: Array.isArray(storedSorters) ? storedSorters : [],
    status: 'idle',
    error: null,
};

const sorterSlice = createSlice({
    name: 'sorter',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //sorters
            .addCase(fetchSorterInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSorterInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sorterInfo = action.payload.sorters;
            })
            .addCase(fetchSorterInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //add sorter
            .addCase(addSorterInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addSorterInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.sorterInfo = action.payload;
                //state.customers.push(action.payload)
            })
            .addCase(addSorterInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //edit customer
            .addCase(updateSorterInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSorterInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sorterInfo = action.payload;
            })
            .addCase(updateSorterInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default sorterSlice.reducer;
