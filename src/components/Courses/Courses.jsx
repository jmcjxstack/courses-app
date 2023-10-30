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
		duration: 0,
		authors: [],
	});

	const [newAuthor, setNewAuthor] = useState({
		id: '',
		name: '',
	});

	const { title, description, creationDate, duration } = newCourse;

	function toggleCreateCourse() {
		setShowCourses((prevShowCourses) => !prevShowCourses);
	}

	function handleInputChangeNewCourse(e) {
		setNewCourse({
			...newCourse,
			[e.target.name]: e.target.value,
		});
	}

	function handleInputChangeNewAuthor(e) {
		setNewCourse({
			...newAuthor,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmitCourse(e) {
		e.preventDefault();
		setCourses([...courses, newCourse]);
		toggleCreateCourse();
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
				title={title}
				description={description}
				creationDate={creationDate}
				duration={duration}
				handleInputChange={(e) => handleInputChangeNewCourse(e)}
				handleNewAuthorChange={(e) => handleInputChangeNewAuthor(e)}
				handleSubmitCourse={(e) => handleSubmitCourse(e)}
				authors={authors}
				newAuthor={newAuthor}
				newCourse={newCourse}
				setNewCourse={(state) => setNewCourse(state)}
			/>
		);
	}
}
