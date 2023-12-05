import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../../../src/config';


// Async Thunk for fetching Customer
export const fetchSorterInfo = createAsyncThunk(
    'sorter/sorters',
    async ({ user_id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api_endpoint}/sorters/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            const data = await response.json();
            // console.log('sorter', data.sorters)
            // Persist the data to sessionStorage
            sessionStorage.setItem('sorterData', JSON.stringify(data.sorters));
            return data;
        } catch (error) {
            console.error('Error fetching sorter details data:', error);
            throw error;
        }
    }
);

// Async Thunk for Adding New Customer
export const addSorterInfo = createAsyncThunk(
    'sorter/addSorter',
    async ({ token, sorterData }, { dispatch, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },  
            }
            const response = await axios.post(`${api_endpoint}/add/sorter`, sorterData, config);

            if (response.status !== 200) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
                console.log("Add Sorter Sucessfully")
            }
            // console.log(response.data.customer)
            // Retrieve existing data from sessionStorage
            const existingData = sessionStorage.getItem('sorterData');

            // Parse the existing data (or initialize an empty array if it doesn't exist)
            const prevCustomers = existingData ? JSON.parse(existingData) : [];

            // Add the new customer data to the existing array
            const updatedSorters = [...prevCustomers, response.data.sorters];

            // Dispatch the action to update the Redux store
            // dispatch(updateCustomerList(updatedCustomers));

            // Update sessionStorage with the updated data
            sessionStorage.setItem('sorterdata', JSON.stringify(updatedSorters));
            // console.log(updatedCustomers);
            return updatedSorters;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);

// Async Thunk for Updating Customer
export const updateSorterInfo = createAsyncThunk(
    'sorter/updateSorter',
    async ({ sorterId, token, sorterData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },  
            }
            const response = await axios.patch(`${api_endpoint}/edit-sorter/${sorterId}`, sorterData, config);

            if (response.status !== 200) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
                console.log("Sorter Updated Sucessfully")
            }
            
            // console.log(response.data.customer)
            // Retrieve existing data from sessionStorage
            const existingData = sessionStorage.getItem('sorterData');

            // Parse the existing data (or initialize an empty array if it doesn't exist)
            const prevCustomers = existingData ? JSON.parse(existingData) : [];

            // Add the new customer data to the existing array
            const updatedSorters = [...prevCustomers, response.data.sorters];

            // Dispatch the action to update the Redux store
            // dispatch(updateCustomerList(updatedCustomers));

            // Update sessionStorage with the updated data
            sessionStorage.setItem('sorterData', JSON.stringify(updatedSorters));
            // console.log(updatedCustomers);
            return updatedSorters;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);