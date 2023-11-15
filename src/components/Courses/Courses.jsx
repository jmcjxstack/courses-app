import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import { fetchAuthorsData } from '../../store/authors/authorsSlice';
import { fetchCoursesData } from '../../store/courses/coursesSlice';
import {
	getCourses,
	isCoursesFetched,
} from '../../store/courses/coursesSelectors';
import {
	getAuthors,
	isAuthorsFetched,
} from '../../store/authors/authorsSelectors';
import { fetchUserData } from '../../store/user/userSlice';
import './courses.css';

export default function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const isCoursesDataFetched = useSelector(isCoursesFetched);
	const isAuthorsDataFetched = useSelector(isAuthorsFetched);

	useEffect(() => {
		dispatch(fetchUserData());
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
					<Button
						buttonName='Add new course'
						onClick={() => navigate('/courses/add')}
					/>
				</div>
			</div>
			<CourseCard courses={courses} authors={authors} />
		</>
	);
}
