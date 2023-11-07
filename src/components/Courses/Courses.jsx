import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import './courses.css';

export default function Courses(props) {
	const navigate = useNavigate();

	return (
		<>
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
}
