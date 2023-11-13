import { createSlice } from '@reduxjs/toolkit';

const authorsInitialState = {
	authors: [],
	isDataFetched: false,
};

const authorsSlice = createSlice({
	name: 'authors',
	initialState: authorsInitialState,
	reducers: {
		setAuthors: (state, action) => {
			state.authors = action.payload;
			state.isDataFetched = true;
		},
		addAuthor: (state, action) => {
			state.authors.push(action.payload);
		},
	},
});

export const { setAuthors, addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
