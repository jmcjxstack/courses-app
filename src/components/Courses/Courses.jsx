import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import { getAllAuthors, getAllCourses } from '../../services';
import { updateAuthors } from '../../store/authors/authorsSlice';
import { updateCourses } from '../../store/courses/coursesSlice';
import './courses.css';

export default function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.courses.courses);
	const authors = useSelector((state) => state.authors.authors);

	useEffect(() => {
		async function fetchAllCourses() {
			const coursesResponse = await getAllCourses();
			const coursesArray = coursesResponse.data.result;
			dispatch(updateCourses(coursesArray));
		}
		async function fetchAllAuthors() {
			const authorsResponse = await getAllAuthors();
			const authorsArray = authorsResponse.data.result;
			dispatch(updateAuthors(authorsArray));
		}
		fetchAllCourses();
		fetchAllAuthors();
	}, []);

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
			<CourseCard courses={courses} authors={authors} />
		</>
	);
}

// Courses.propTypes = {
// 	courses: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.string,
// 			title: PropTypes.string,
// 			description: PropTypes.string,
// 			creationDate: PropTypes.string,
// 			duration: PropTypes.number,
// 			authors: PropTypes.arrayOf(PropTypes.string),
// 		})
// 	),
// 	authors: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.string,
// 			name: PropTypes.string,
// 		})
// 	),
// };
