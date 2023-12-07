import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api_endpoint from '../../../src/config'
import Cookies from 'js-cookie'
import localhost_domain from '../../../src/cookie';

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api_endpoint}/login`, userData);
            if (response.status === 200) {
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('role', response.data.user.role);
                // localStorage.setItem('user_id', response.data.user.id);
                Cookies.set('isLoggedIn', true, { expires: 7, domain: localhost_domain, httpOnly: true, sameSite: 'strict'})
                Cookies.set('tk', response.data.token, { expires: 7, domain: localhost_domain, secure: true, sameSite: 'strict'})
                Cookies.set('rl', response.data.user.role, { expires: 7, domain: localhost_domain, secure: true, sameSite: 'strict'})
                Cookies.set('uid', response.data.user.id, { expires: 7, domain: localhost_domain, secure: true, sameSite: 'strict'})
            }
            return response.data;
        } catch (error) {
            // Check if email validation error exists
            if (error.response && error.response.data.email === 'Email Not Found') {
                return rejectWithValue({ type: 'email', message: 'Email not found. Please double-check and try again.' });
            }
            // Check if other validation errors exist (e.g., name)
            if (error.response && error.response.data.password === 'Invalid Password') {
                return rejectWithValue({ type: 'password', message: "Incorrect Password. Please double-check and try again." });
            }
            // Check if other validation errors exist (e.g., name)
            if (error.response && error.response.data.disabled === 'User is disabled') {
                return rejectWithValue({ type: 'disabled', message: "Incorrect Password. Please double-check and try again." });
            }
        }
    }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api_endpoint}/register/users`, userData);
            if (response.status === 200) {
                // Cookies.set('tk', response.data.token, { expires: 7, domain: localhost_domain, sameSite: 'strict' }) //secure: true
                // Cookies.set('rl', response.data.user.role, { expires: 7, domain: localhost_domain, sameSite: 'strict'})
                Cookies.set('uid', response.data.user.id, { expires: 7, domain: localhost_domain, secure: true, sameSite: 'strict'})
                console.log("Successfull Registration")
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.status === 'Validation error') {
                // Extract specific validation errors
                const validationErrors = error.response.data.error;

                // Check if email validation error exists
                if (validationErrors.email) {
                    return rejectWithValue({ type: 'email', message: 'The email has already been taken' });
                }
                // Check if other validation errors exist (e.g., name)
                if (validationErrors.name) {
                    return rejectWithValue({ type: 'name', message: validationErrors.name[0] });
                }
                // If no specific validation error is found, return a generic error
                return rejectWithValue('Validation error');
            } else {
                return rejectWithValue('Something Went Wrong');
            }
        }
    }
);

// Async Thunk for User Registration
export const companyDetails = createAsyncThunk(
    'auth/company',
    async (userData, { rejectWithValue }) => {
        try {
            let token = Cookies.get('tk');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token,
                },  
            }
            console.log(userData);
            const response = await axios.post(`${api_endpoint}/add-info`, userData, config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.status === 401) {
                return rejectWithValue('Error');
            } else {
                return rejectWithValue('Something Went Wrong');
            }
        }
    }
);
