import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import './courseCard.css';
import { deleteCourse } from '../../../../store/courses/coursesSlice';

export default function CourseCard({ courses, authors }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleDelete(courseId) {
		dispatch(deleteCourse(courseId));
	}

	return (
		<>
			{courses &&
				courses.map((course) => (
					<div className='course-container' key={course.id}>
						<div className='course-info-left'>
							<h1>{course.title}</h1>
							<p className='description'>{course.description}</p>
						</div>
						<div className='course-info-right'>
							<p>
								<b>Authors: </b>
								{authors &&
									course &&
									course?.authors
										.map(
											(authorId) =>
												authors.find((author) => author?.id === authorId)?.name
										)
										.join(', ')}
							</p>
							<p>
								<b>Duration: </b>
								{getCourseDuration(course.duration)}
							</p>
							<p>
								<b>Created: </b>
								{course &&
									course.creationDate &&
									formatCreationDate(course?.creationDate)}
							</p>
							<div className='show-button'>
								<Button
									buttonName='Show Course'
									onClick={() => navigate(`/courses/${course.id}`)}
								/>
								<Button buttonName='Edit' />
								<Button
									buttonName='Delete'
									onClick={() => handleDelete(course.id)}
								/>
							</div>
						</div>
					</div>
				))}
		</>
	);
}

CourseCard.propTypes = {
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
