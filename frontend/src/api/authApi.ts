
import axios from 'axios'
import { BACKEND_BASE_URL } from '../constants';


export async function loginApi(email: string, password: string, userType: UserType) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/login/`, { email, password });
        return response.data;
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
        return response.data;
    } catch (error) {
        throw error;
    }
}
