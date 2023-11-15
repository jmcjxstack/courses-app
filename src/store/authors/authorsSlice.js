import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAuthorsService } from '../../services';

const authorsInitialState = {
	authors: [],
	isDataFetched: false,
	status: 'idle',
	error: null,
};

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
			.addCase(fetchAuthorsData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAuthorsData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.authors = action.payload;
				state.isDataFetched = true;
			})
			.addCase(fetchAuthorsData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { setAuthors, addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
