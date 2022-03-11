import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function loginUser(dataSubmit) {
    
    const request = axios.post(`${USER_SERVER}/login`, dataSubmit)
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataSubmit) {
    
    const request = axios.post(`${USER_SERVER}/register`, dataSubmit)
    .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}
export function auth() {
    
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(res => res.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}