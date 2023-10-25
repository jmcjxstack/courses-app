import React, { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

export default function Courses() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	return (
		<>
			<div>Courses</div>
			<CourseCard courses={courses} authors={authors} />
		</>
	);
}
