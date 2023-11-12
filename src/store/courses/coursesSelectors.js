export const getCourses = (state) => state.courses.courses;
export const getCourseById = (state, courseId) => {
	return state.courses.courses.find((course) => course.id === courseId);
};
