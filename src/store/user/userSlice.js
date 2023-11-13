import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

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
		},
		resetUser: () => userInitialState,
	},
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
