import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAuthorsService } from '../../services';

export const fetchAuthorsDataThunk = createAsyncThunk(
	'authors/fetchAuthorsDataThunk',
	async () => {
		try {
			const data = await getAllAuthorsService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);
