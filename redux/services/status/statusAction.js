import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../../../src/config';


// Async Thunk for fetching Customer
export const fetchStatusInfo = createAsyncThunk(
    'statusInfo/fetchStatus',
    async ({ user_id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api_endpoint}/fetch-status/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
              return rejectWithValue({ type: 'http', status: response.status });
            }
            
            const data = await response.json();
            // console.log('status', data.status)
            // Persist the data to sessionStorage
            sessionStorage.setItem('statusData', JSON.stringify(data.status));
            return data;
        } catch (error) {
            console.error('Error fetching status customer details data:', error);
            throw error;
        }
    }
);

// Async Thunk for Adding New Customer
export const addStatusInfo = createAsyncThunk(
    'statusInfo/addStatus',
    async ({ token, statusData }, { dispatch, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },  
            }
            const response = await axios.post(`${api_endpoint}/add-status`, statusData, config);

            if (response.status !== 200) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
                console.log("Add Status Sucessfully")
            }
            // console.log(response.data.customer)
            // Retrieve existing data from sessionStorage
            const existingData = sessionStorage.getItem('statusData');

            // Parse the existing data (or initialize an empty array if it doesn't exist)
            const prevCustomers = existingData ? JSON.parse(existingData) : [];

            // Add the new customer data to the existing array
            const updatedStatus = [...prevCustomers, response.data.status];

            // Dispatch the action to update the Redux store
            // dispatch(updateCustomerList(updatedCustomers));

            // Update sessionStorage with the updated data
            sessionStorage.setItem('statusData', JSON.stringify(updatedStatus));
            // console.log(updatedCustomers);
            return updatedStatus;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);

// Async Thunk for Updating Customer
export const updatedStatusInfo = createAsyncThunk(
    'statusInfo/updateStatus',
    async ({ sorterId, token, sorterData: statusData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },  
            }
            const response = await axios.patch(`${api_endpoint}/update-status/${sorterId}`, statusData, config);

            if (response.status !== 200) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
                console.log("Status Updated Sucessfully")
            }
            
            // console.log(response.data.customer)
            // Retrieve existing data from sessionStorage
            const existingData = sessionStorage.getItem('statusData');

            // Parse the existing data (or initialize an empty array if it doesn't exist)
            const prevCustomers = existingData ? JSON.parse(existingData) : [];

            // Add the new customer data to the existing array
            const updatedStatus = [...prevCustomers, response.data.status];

            // Dispatch the action to update the Redux store
            // dispatch(updateCustomerList(updatedCustomers));

            // Update sessionStorage with the updated data
            sessionStorage.setItem('statusData', JSON.stringify(updatedStatus));
            // console.log(updatedCustomers);
            return updatedStatus;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);