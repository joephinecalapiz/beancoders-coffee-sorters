import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../../../src/config';
import { updateCustomerList } from './customerSlice';


// Async Thunk for fetching Customer
export const fetchCustomerInfo = createAsyncThunk(
    'customer/customers',
    async ({ user_id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api_endpoint}/customers/${user_id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              return rejectWithValue({ type: 'http', status: response.status });
            }
      
            const data = await response.json();
            // console.log(data.customer)
            sessionStorage.setItem('customerData', JSON.stringify(data.customer));
            return data;
          } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
          }
    }
);

// Async Thunk for Adding New Customer
export const addCustomerInfo = createAsyncThunk(
    'customer/addCustomer',
    async ({ user_id, token, customerData }, { dispatch, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },  
            }
            const response = await axios.post(`${api_endpoint}/add-customer/${user_id}`, customerData, config);

            if (response.status !== 200) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
                console.log("Add Customer Sucessfully")
            }
            // console.log(response.data.customer)
            // Retrieve existing data from sessionStorage
            const existingData = sessionStorage.getItem('customerData');

            // Parse the existing data (or initialize an empty array if it doesn't exist)
            const prevCustomers = existingData ? JSON.parse(existingData) : [];

            // Add the new customer data to the existing array
            const updatedCustomers = [...prevCustomers, response.data.customer];

            // Dispatch the action to update the Redux store
            // dispatch(updateCustomerList(updatedCustomers));

            // Update sessionStorage with the updated data
            sessionStorage.setItem('customerData', JSON.stringify(updatedCustomers));
            // console.log(updatedCustomers);
            return updatedCustomers;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);

// Async Thunk for Updating Customer
export const updateCustomerInfo = createAsyncThunk(
    'customer/updateCustomer',
    async ({ customerId, token, customerData }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },  
            }
            const response = await axios.patch(`${api_endpoint}/edit-customer/${customerId}`, customerData, config);

            if (response.status !== 200) {
                return rejectWithValue({ type: 'http', status: response.status });
            }

            if (response.status === 200) {
                console.log("Customer Updated Sucessfully")
            }
            
            // console.log(response.data.customer)
            // Retrieve existing data from sessionStorage
            const existingData = sessionStorage.getItem('customerData');

            // Parse the existing data (or initialize an empty array if it doesn't exist)
            const prevCustomers = existingData ? JSON.parse(existingData) : [];

            // Add the new customer data to the existing array
            const updatedCustomers = [...prevCustomers, response.data.customer];

            // Dispatch the action to update the Redux store
            // dispatch(updateCustomerList(updatedCustomers));

            // Update sessionStorage with the updated data
            sessionStorage.setItem('customerData', JSON.stringify(updatedCustomers));
            // console.log(updatedCustomers);
            return updatedCustomers;
        } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
        }
    }
);

// Async Thunk for Archiving Customer
export const archiveCustomerInfo = createAsyncThunk(
    'customer/archiveCustomer',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${api_endpoint}/archive-customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

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

export const deleteCustomerInfo = createAsyncThunk(
    'customer/deleteCustomer',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api_endpoint}/delete-customer/${id}`, {
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