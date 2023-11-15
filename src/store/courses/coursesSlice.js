import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCoursesService } from '../../services';

const coursesInitialState = {
	courses: [],
	isDataFetched: false,
	status: 'idle',
	error: null,
};

export const fetchCoursesData = createAsyncThunk(
	'courses/fetchCoursesData',
	async () => {
		try {
			const data = await getAllCoursesService();
			return data;
		} catch (error) {
			throw error;
		}
	}
);

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
