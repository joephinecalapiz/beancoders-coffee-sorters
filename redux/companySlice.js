import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyDetails } from './userActions';

// initialize role from local storage
const storedCompanyInfo = JSON.parse(sessionStorage.getItem('companyInfo'))
  ? JSON.parse(sessionStorage.getItem('companyInfo'))
  : ''

const initialState = {
    companyInfo: storedCompanyInfo,
    status: 'idle',
    error: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyInfo = action.payload;
            })
            .addCase(fetchCompanyDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default companySlice.reducer;
