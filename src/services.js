import { API_URL } from './constants';
import axios from 'axios';

//User
export async function registerUserService(userInfo) {
	const response = await axios.post(`${API_URL}/register`, userInfo);
	return response.data;
}

export async function loginUserService(loginInfo) {
	const response = await axios.post(`${API_URL}/login`, loginInfo);
	return response.data;
}

export async function logoutUserService() {
	const token = localStorage.getItem('isAuth');
	const response = await axios.delete(`${API_URL}/logout`, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
}

export async function getUserInfoService() {
	if (!!localStorage.getItem('isAuth')) {
		const token = localStorage.getItem('isAuth');
		const response = await axios.get(`${API_URL}/users/me`, {
			headers: {
				Authorization: token,
			},
		});
		return response.data;
	}
}

//Courses
export async function getAllCoursesService() {
	const response = await axios.get(`${API_URL}/courses/all`);
	return response.data.result;
}

export async function addCourseService(courseInfo) {
	const token = localStorage.getItem('isAuth');
	const response = await axios.post(`${API_URL}/courses/add`, courseInfo, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
}

export async function loadCourseService(id) {
	const response = await axios.get(`${API_URL}/courses/${id}`);
	return response.data.result;
}

export async function deleteCourseService(id) {
	const token = localStorage.getItem('isAuth');
	const response = await axios.delete(`${API_URL}/courses/${id}`, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
}

export async function updateCourseService(id, courseInfo) {
	const token = localStorage.getItem('isAuth');
	const response = await axios.put(`${API_URL}/courses/${id}`, courseInfo, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
}

//Authors
export async function getAllAuthorsService() {
	const response = await axios.get(`${API_URL}/authors/all`);
	return response.data.result;
}

export async function addAuthorService(authorInfo) {
	const token = localStorage.getItem('isAuth');
	const response = await axios.post(`${API_URL}/authors/add`, authorInfo, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
}
