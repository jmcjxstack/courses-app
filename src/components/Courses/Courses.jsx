import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import './courses.css';

export default function Courses(props) {
	const navigate = useNavigate();

	return (
		<>
			<Header loginOrRegistration={false} />
			<div className='topbar'>
				<SearchBar />
				<Button buttonName='Search' />
				<div className='new-course-button'>
					<Button
						buttonName='Add new course'
						onClick={() => navigate('/courses/add')}
					/>
				</div>
			</div>
			<CourseCard courses={props.courses} authors={props.authors} />
		</>
	);

	// if (showCourses) {
	// 	return (
	// 		<>
	// 			<Header loginOrRegistration={false} />
	// 			<div className='topbar'>
	// 				<SearchBar />
	// 				<Button buttonName='Search' />
	// 				<div className='new-course-button'>
	// 					<Button buttonName='Add new course' onClick={toggleCreateCourse} />
	// 				</div>
	// 			</div>
	// 			<CourseCard courses={courses} authors={authors} />
	// 		</>
	// 	);
	// } else {
	// 	return (
	// 		<>
	// 			<CreateCourse
	// 				authors={authors}
	// 				courses={courses}
	// 				setAuthors={(state) => setAuthors(state)}
	// 				setCourses={(state) => setCourses(state)}
	// 			/>
	// 		</>
	// 	);
	// }
}
