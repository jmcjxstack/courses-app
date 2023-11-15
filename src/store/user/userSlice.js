import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserInfoService } from '../../services';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	status: '',
	error: null,
};

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

const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		updateUser: (state, action) => {
			const { result, user } = action.payload;
			state.isAuth = true;
			state.name = user.name;
			state.email = user.email;
			state.token = result;
			localStorage.setItem('isAuth', result);
		},
		resetUser: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
			localStorage.removeItem('isAuth');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				try {
					state.status = 'succeeded';
					state.isAuth = true;
					state.token = localStorage.getItem('isAuth');
					state.name = action.payload.result.name;
					state.email = action.payload.result.email;
					state.role = action.payload.result.role;
				} catch (error) {
					console.log(error);
				}
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
