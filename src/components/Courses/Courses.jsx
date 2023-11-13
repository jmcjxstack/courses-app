import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import { getAllAuthors, getAllCourses } from '../../services';
import { setAuthors } from '../../store/authors/authorsSlice';
import { setCourses } from '../../store/courses/coursesSlice';
import {
	getCourses,
	isCoursesFetched,
} from '../../store/courses/coursesSelectors';
import {
	getAuthors,
	isAuthorsFetched,
} from '../../store/authors/authorsSelectors';
import './courses.css';

export default function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const isCoursesDataFetched = useSelector(isCoursesFetched);
	const isAuthorsDataFetched = useSelector(isAuthorsFetched);

	useEffect(() => {
		async function fetchAllCourses() {
			const coursesResponse = await getAllCourses();
			const coursesArray = coursesResponse.data.result;
			dispatch(setCourses(coursesArray));
		}
		async function fetchAllAuthors() {
			const authorsResponse = await getAllAuthors();
			const authorsArray = authorsResponse.data.result;
			dispatch(setAuthors(authorsArray));
		}
		if (!isCoursesDataFetched) {
			fetchAllCourses();
		}
		if (!isAuthorsDataFetched) {
			fetchAllAuthors();
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
