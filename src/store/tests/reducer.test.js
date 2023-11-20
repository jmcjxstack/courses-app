import coursesReducer, { addCourse } from '../courses/coursesSlice';

describe('coursesReducer', () => {
	it('should return the initial state', () => {
		const initialState = {
			courses: [],
			status: 'idle',
			error: null,
		};
		const result = coursesReducer(undefined, {});
		expect(result).toEqual(initialState);
	});

	it('should handle SAVE_COURSE and return new state', () => {
		const initialState = {
			courses: [],
			status: 'idle',
			error: null,
		};

		const courseToAdd = {
			id: '1',
			title: 'Test Course',
			description: 'Test Description',
			duration: 60,
			creationDate: '18/11/2023',
			authors: ['1', '2'],
		};

		const action = addCourse(courseToAdd);
		const result = coursesReducer(initialState, action);

		expect(result.courses).toHaveLength(1);
		expect(result.courses[0]).toEqual(courseToAdd);
	});
});
