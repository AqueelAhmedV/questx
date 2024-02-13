
import axios from 'axios'
import { BACKEND_BASE_URL } from '../constants';



export async function login(email: string, password: string, userType: UserType) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/login/`, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function signup(userData: Partial<User>) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/signup/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
