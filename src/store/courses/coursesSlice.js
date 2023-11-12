import { createSlice } from '@reduxjs/toolkit';

const coursesInitialState = {
	courses: [],
};

const coursesSlice = createSlice({
	name: 'courses',
	initialState: coursesInitialState,
	reducers: {
		updateCourses: (state, action) => {
			state.courses = action.payload;
		},
		addCourse: (state, action) => {
			state.courses.push(action.payload);
		},
	},
});

export const { updateCourses, addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
