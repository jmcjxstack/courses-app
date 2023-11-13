import { createSlice } from '@reduxjs/toolkit';

const coursesInitialState = {
	courses: [],
	isDataFetched: false,
};

const coursesSlice = createSlice({
	name: 'courses',
	initialState: coursesInitialState,
	reducers: {
		setCourses: (state, action) => {
			state.courses = action.payload;
			state.isDataFetched = true;
		},
		addCourse: (state, action) => {
			state.courses.push(action.payload);
		},
		deleteCourse: (state, action) => {
			const courseIdToDelete = action.payload;
			state.courses = state.courses.filter(
				(course) => course.id !== courseIdToDelete
			);
		},
	},
});

export const { setCourses, addCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
