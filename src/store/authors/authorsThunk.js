import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAuthorsService } from '../../services';

export const fetchAuthorsData = createAsyncThunk(
	'authors/fetchAuthorsData',
	async () => {
		try {
			const data = await getAllAuthorsService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);
