import React, { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import './courses.css';

export default function Courses() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	function search() {
		console.log('searching');
	}

	return (
		<>
			<div className='topbar'>
				<SearchBar />
				<Button buttonName='Search' onClick={search} />
				<div className='new-course-button'>
					<Button buttonName='Add new course' onClick={search} />
				</div>
			</div>
			<CourseCard courses={courses} authors={authors} />
		</>
	);
}
