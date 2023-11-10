import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

import './courses.css';
import { getCourses } from '../../store/courses/selectors';
import { getAllCourses } from '../../services';
import { saveCoursesAction } from '../../store/courses/actions';
export default function Courses(props) {
	const navigate = useNavigate();
	// const dispatch = useDispatch();
	// const testCourses = useSelector(getCourses);

	// useEffect(() => {
	// 	async function fetchCourses() {
	// 		const response = await getAllCourses();
	// 		console.log(response.data.result);
	// 		dispatch(saveCoursesAction(response.data.result));
	// 		console.log(testCourses);
	// 	}
	// 	fetchCourses();
	// }, []);

	return (
		<>
			<div className='topbar'>
				<SearchBar />
				<Button buttonName='Search' />
				{/* {testCourses} */}
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

Courses.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			creationDate: PropTypes.string,
			duration: PropTypes.number,
			authors: PropTypes.arrayOf(PropTypes.string),
		})
	),
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};
