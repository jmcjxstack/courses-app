import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorsDataThunk } from './authorsThunk';

const authorsInitialState = {
	authors: [],
	status: 'idle',
	error: null,
};

const authorsSlice = createSlice({
	name: 'authors',
	initialState: authorsInitialState,
	reducers: {
		addAuthor: (state, action) => {
			state.authors.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthorsDataThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAuthorsDataThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.authors = action.payload;
			})
			.addCase(fetchAuthorsDataThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { setAuthors, addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
