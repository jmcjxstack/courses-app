import { createSlice } from '@reduxjs/toolkit';

const authorsInitialState = [];

const authorsSlice = createSlice({
	name: 'authors',
	authorsInitialState,
	reducers: {},
});

export default authorsSlice.reducer;
