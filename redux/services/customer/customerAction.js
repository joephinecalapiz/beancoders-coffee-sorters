import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../../../src/config';

// Async Thunk for Adding New Customer
export const addCustomerInfo = createAsyncThunk(
    'customer/add',
    async ({ user_id, customerData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api_endpoint}/add-customer/${user_id}`, customerData);

            if (!response.ok) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
            }
            return response.data;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);

export const fetchCustomerArchives = createAsyncThunk(
    'customer/fetchArchive',
    async ({ user_id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api_endpoint}/fetch-archive/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            const data = await response.json();
            // console.log(data.archiveds)
            // sessionStorage.setItem('customerData', JSON.stringify(data.customer));
            return data;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);