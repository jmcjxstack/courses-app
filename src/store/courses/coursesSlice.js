import { createSlice } from '@reduxjs/toolkit';
import { fetchCoursesData } from './coursesThunk';

const coursesInitialState = {
	courses: [],
	isDataFetched: false,
	status: 'idle',
	error: null,
};

const coursesSlice = createSlice({
	name: 'courses',
	initialState: coursesInitialState,
	reducers: {
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
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoursesData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCoursesData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.courses = action.payload;
				state.isDataFetched = true;
			})
			.addCase(fetchCoursesData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { setCourses, addCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
