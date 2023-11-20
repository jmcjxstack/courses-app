import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import { getUserRole } from '../../store/user/userSelectors';
import { fetchCoursesDataThunk } from '../../store/courses/coursesThunk';
import { fetchAuthorsDataThunk } from '../../store/authors/authorsThunk';
import './courses.css';

export default function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const role = useSelector(getUserRole);

	useEffect(() => {
		dispatch(fetchCoursesDataThunk());
		dispatch(fetchAuthorsDataThunk());
	}, [dispatch]);

	return (
		<>
			<div className='topbar'>
				<div className='searchbar'>
					<SearchBar />
					<Button buttonName='Search' />
				</div>
				<div className='new-course-button'>
					{role === 'admin' && (
						<Button
							buttonName='Add new course'
							onClick={() => navigate('/courses/add')}
						/>
					)}
				</div>
			</div>
			<CourseCard />
		</>
	);
}
