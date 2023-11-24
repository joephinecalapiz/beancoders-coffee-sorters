import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../src/config'

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
    async ({ user_id, token }) => {
        try {
            const response = await fetch(`${api_endpoint}/customers/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch customer details data');
            }
            const data = await response.json();
            // console.log(data.customer[0])
            // Persist the data to sessionStorage
            // sessionStorage.setItem('customerData', JSON.stringify(data.customer));
            return data;
        } catch (error) {
            console.error('Error fetching company details data:', error);
            throw error;
        }
    });

export const fetchSorterInfo = createAsyncThunk(
    'user/sorters',
    async ({ user_id, token }) => {
        try {
            const response = await fetch(`${api_endpoint}/sorters/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch sorter details data');
            }
            const data = await response.json();
            // console.log(data.sorter[0])
            // Persist the data to sessionStorage
            // sessionStorage.setItem('companyInfo', JSON.stringify(compData.details));
            return data;
        } catch (error) {
            console.error('Error fetching sorter details data:', error);
            throw error;
        }
    });

export const fetchStatusInfo = createAsyncThunk(
    'user/status',
    async ({ user_id, token }) => {
        try {
            const response = await fetch(`${api_endpoint}/fetch-status/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch status customer details data');
            }
            const data = await response.json();
            // console.log(data.status[0])
            // Persist the data to sessionStorage
            // sessionStorage.setItem('companyInfo', JSON.stringify(compData.details));
            return data;
        } catch (error) {
            console.error('Error fetching status customer details data:', error);
            throw error;
        }
    });
