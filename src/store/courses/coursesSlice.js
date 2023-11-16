import { createSlice } from '@reduxjs/toolkit';
import { fetchCoursesDataThunk, deleteCourseThunk } from './coursesThunk';

const coursesInitialState = {
	courses: [],
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
		updateCourse: (state, action) => {
			const { courseId, updatedCourseData } = action.payload;
			const courseIndex = state.courses.findIndex(
				(course) => course.id === courseId
			);
			if (courseIndex !== -1) {
				state.courses[courseIndex] = {
					...state.courses[courseIndex],
					...updatedCourseData,
				};
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoursesDataThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCoursesDataThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.courses = action.payload;
			})
			.addCase(fetchCoursesDataThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deleteCourseThunk.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteCourseThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const courseIdToDelete = action.payload.result.split(' ')[4];
				state.courses = state.courses.filter(
					(course) => course.id !== courseIdToDelete
				);
			})
			.addCase(deleteCourseThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { addCourse, updateCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
