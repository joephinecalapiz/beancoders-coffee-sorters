import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../src/config'

export const fetchCompanyDetails = createAsyncThunk(
    'company/fetchInfo',
    async ({ user_id, token }) => {
        try {
            const response = await fetch(`${api_endpoint}/fetch-info/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch company details data');
            }
            const compData = await response.json();
            // console.log(compData.details)
            // Persist the data to sessionStorage
            sessionStorage.setItem('companyInfo', JSON.stringify(compData.details));
            return compData.details;
        } catch (error) {
            console.error('Error fetching company details data:', error);
            throw error;
        }
    });

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
            console.log(userData.user)
            // Persist the data to sessionStorage
            sessionStorage.setItem('userInfo', JSON.stringify(userData.user));
            return userData.user;
        } catch (error) {
            console.error('Error fetching user details data:', error);
            throw error;
        }
    });
