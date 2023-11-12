import { createSlice } from '@reduxjs/toolkit';

const authorsInitialState = {
	authors: [],
};

const authorsSlice = createSlice({
	name: 'authors',
	initialState: authorsInitialState,
	reducers: {
		updateAuthors: (state, action) => {
			state.authors = action.payload;
		},
	},
});

export const { updateAuthors } = authorsSlice.actions;

export default authorsSlice.reducer;
