import { createSlice, current } from '@reduxjs/toolkit';
import { fetchCustomerArchives, updateCustomerInfo, archiveCustomerInfo, deleteCustomerInfo, fetchCustomerInfo, addCustomerInfo } from './customerAction';

// initialize role from session storage
// const customers = JSON.parse(sessionStorage.getItem('customerData'))
//     ? JSON.parse(sessionStorage.getItem('customerData'))
//     : []

const storedCustomers = JSON.parse(sessionStorage.getItem('customerData'));

// const archivedData = JSON.parse(sessionStorage.getItem('userInfo'))
//     ? JSON.parse(sessionStorage.getItem('userInfo'))
//     : []

// const addCustomer = JSON.parse(sessionStorage.getItem('customerData'))
//     ? JSON.parse(sessionStorage.getItem('customerData'))
//     : []

const initialState = {
    customers: Array.isArray(storedCustomers) ? storedCustomers : [],
    // addCustomer: [],
    // updateCustomer: null,
    // archiveCustomer: null,
    archiveds: [],
    // deleteCustomer: null,
    status: 'idle',
    error: null,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        updateCustomerList: (state, { payload }) => {
            state.customers.push(payload);
        },
        // updateCustomerList: (state, action) => {
        //     state.customers = action.payload;
        //     console.log(current(state))
        // },
        // updateCustomerList: (state, { payload }) => {
        //     return {
        //         ...state,
        //         customers: [...state.customers, payload],
        //     };
        // },
        // addCustomerInfo(state, action) {
        //     state.customers.push(action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder
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
            //add customer
            .addCase(addCustomerInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCustomerInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload;
                //state.customers.push(action.payload)
            })
            .addCase(addCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //edit customer
            .addCase(updateCustomerInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCustomerInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.updateCustomer = action.payload.customer;
            })
            .addCase(updateCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //archive customer
            .addCase(archiveCustomerInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(archiveCustomerInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.archiveCustomer = action.payload.customer;
            })
            .addCase(archiveCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //fetch customer archives
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
            })

            //delete customer
            .addCase(deleteCustomerInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCustomerInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deleteCustomer = action.payload.customer;
            })
            .addCase(deleteCustomerInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { updateCustomerList } = customerSlice.actions
export default customerSlice.reducer;
