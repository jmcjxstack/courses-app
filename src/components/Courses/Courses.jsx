import React, { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import './courses.css';

export default function Courses() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [showCourses, setShowCourses] = useState(true);
	const [newCourse, setNewCourse] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: undefined,
		authors: [],
	});

	const [newAuthor, setNewAuthor] = useState({
		id: '',
		name: '',
	});

	function toggleCreateCourse() {
		setShowCourses((prevShowCourses) => !prevShowCourses);
	}

	if (showCourses) {
		return (
			<>
				<div className='topbar'>
					<SearchBar />
					<Button buttonName='Search' />
					<div className='new-course-button'>
						<Button buttonName='Add new course' onClick={toggleCreateCourse} />
					</div>
				</div>
				<CourseCard courses={courses} authors={authors} />
			</>
		);
	} else {
		return (
			<CreateCourse
				authors={authors}
				courses={courses}
				newAuthor={newAuthor}
				newCourse={newCourse}
				setAuthors={(state) => setAuthors(state)}
				setCourses={(state) => setCourses(state)}
				setNewAuthor={(state) => setNewAuthor(state)}
				setNewCourse={(state) => setNewCourse(state)}
				toggleCreateCourse={toggleCreateCourse}
			/>
		);
	}
}
