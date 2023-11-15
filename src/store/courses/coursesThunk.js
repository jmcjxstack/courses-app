import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCoursesService } from '../../services';

export const fetchCoursesData = createAsyncThunk(
	'courses/fetchCoursesData',
	async () => {
		try {
			const data = await getAllCoursesService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);
