export const getCourses = (state) => state.courses.courses;
export const isCoursesFetched = (state) => state.courses.isDataFetched;
export const getCourseById = (state, courseId) => {
	return state.courses.courses.find((course) => course.id === courseId);
};
