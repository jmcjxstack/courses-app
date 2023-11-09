import { API_URL } from './constants';
import axios from 'axios';

export async function registerUser(userInfo) {
	await axios.post(`${API_URL}/register`, userInfo);
}

export async function loginUser(loginInfo) {
	const response = await axios.post(`${API_URL}/login`, loginInfo);
	return response;
}
