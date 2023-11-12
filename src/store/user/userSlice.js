import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

const userSlice = createSlice({
	name: 'user',
	userInitialState,
	reducers: {},
});

export default userSlice.reducer;
