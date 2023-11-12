import { createSlice } from '@reduxjs/toolkit';

const coursesInitialState = [];

const coursesSlice = createSlice({
	name: 'courses',
	coursesInitialState,
	reducers: {},
});

export default coursesSlice.reducer;
