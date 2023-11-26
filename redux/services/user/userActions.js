import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../../../src/config';

export const fetchUserDetails = createAsyncThunk(
    'user/fetchInfo',
    async ({ token }) => {
        try {
            const response = await fetch(`${api_endpoint}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch company details data');
            }
            const userData = await response.json();
            // console.log(userData.user)
            // Persist the data to sessionStorage
            sessionStorage.setItem('userInfo', JSON.stringify(userData.user));
            return userData.user;
        } catch (error) {
            console.error('Error fetching user details data:', error);
            throw error;
        }
    });

export const fetchCustomerInfo = createAsyncThunk(
    'user/customers',
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
            sessionStorage.setItem('customerData', JSON.stringify(data.customer));
            return data;
          } catch (error) {
            // General error handling
            console.error('Error:', error);
            throw error;
          }
    }
);

export const fetchSorterInfo = createAsyncThunk(
    'user/sorters',
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

export const fetchStatusInfo = createAsyncThunk(
    'user/status',
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