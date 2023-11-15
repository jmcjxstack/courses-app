import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfoService } from '../../services';

export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	async () => {
		try {
			const data = await getUserInfoService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);
