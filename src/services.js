import { API_URL } from './constants';
import axios from 'axios';

export async function registerUser(userInfo) {
	await axios.post(`${API_URL}/register`, userInfo);
}

export async function loginUser(loginInfo) {
	const response = await axios.post(`${API_URL}/login`, loginInfo);
	return response;
}

export async function getAllCourses() {
	const response = await axios.get(`${API_URL}/courses/all`);
	return response;
}

export async function getAllAuthors() {
	const response = await axios.get(`${API_URL}/authors/all`);
	return response;
}
