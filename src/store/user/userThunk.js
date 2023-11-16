import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfoService } from '../../services';

export const fetchUserDataThunk = createAsyncThunk(
	'user/fetchUserDataThunk',
	async () => {
		try {
			const data = await getUserInfoService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);
