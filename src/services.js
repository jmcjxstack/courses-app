import { API_URL } from './constants';
import axios from 'axios';

export async function registerUserService(userInfo) {
	const response = await axios.post(`${API_URL}/register`, userInfo);
	return response.data;
}

export async function loginUserService(loginInfo) {
	const response = await axios.post(`${API_URL}/login`, loginInfo);
	return response.data;
}

export async function getAllCoursesService() {
	const response = await axios.get(`${API_URL}/courses/all`);
	return response.data.result;
}

export async function getAllAuthorsService() {
	const response = await axios.get(`${API_URL}/authors/all`);
	return response.data.result;
}
