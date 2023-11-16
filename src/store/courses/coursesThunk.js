import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCourseService, getAllCoursesService } from '../../services';

export const fetchCoursesDataThunk = createAsyncThunk(
	'courses/fetchCoursesDataThunk',
	async () => {
		try {
			const data = await getAllCoursesService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);

export const deleteCourseThunk = createAsyncThunk(
	'courses/deleteCourseThunk',
	async (id) => {
		try {
			const data = await deleteCourseService(id);
			return data;
		} catch (error) {
			throw error;
		}
	}
);
