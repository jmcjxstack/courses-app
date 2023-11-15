import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import { fetchAuthorsData } from '../../store/authors/authorsSlice';
import { fetchCoursesData } from '../../store/courses/coursesSlice';
import { isCoursesFetched } from '../../store/courses/coursesSelectors';
import { isAuthorsFetched } from '../../store/authors/authorsSelectors';
import './courses.css';
import { getUserRole } from '../../store/user/userSelectors';

export default function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCoursesDataFetched = useSelector(isCoursesFetched);
	const isAuthorsDataFetched = useSelector(isAuthorsFetched);
	const role = useSelector(getUserRole);

	useEffect(() => {
		if (!isCoursesDataFetched) {
			dispatch(fetchCoursesData());
		}
		if (!isAuthorsDataFetched) {
			dispatch(fetchAuthorsData());
		}
	}, [isCoursesDataFetched, isAuthorsDataFetched, dispatch]);

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
