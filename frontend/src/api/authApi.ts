
import axios from 'axios'
import { BACKEND_BASE_URL } from '../constants';


export async function logoutApi(email: string, userType: UserType) {
    
}

export async function loginApi(email: string, password: string, userType: UserType) {
    try {
        let loginData = { email, password, user_type: userType }
        const response = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include'
        })
        let data = await response.json()
        console.log(response)
        if (response.status >= 400) {
            throw data;
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export async function registerApi(userData: Partial<User>) {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        }).then((r) => r.json())
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}
