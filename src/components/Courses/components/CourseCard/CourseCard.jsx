import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

import './courseCard.css';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

export default function CourseCard({ courses, authors }) {
	const navigate = useNavigate();

	return (
		<>
			{courses?.map((course) => (
				<div className='course-container' key={course.id}>
					<div className='course-info-left'>
						<h1>{course.title}</h1>
						<p className='description'>{course.description}</p>
					</div>
					<div className='course-info-right'>
						<p>
							<b>Authors: </b>
							{course?.authors
								.map(
									(authorId) =>
										authors.find((author) => author.id === authorId).name
								)
								.join(', ')}
						</p>
						<p>
							<b>Duration: </b>
							{getCourseDuration(course.duration)}
						</p>
						<p>
							<b>Created: </b>
							{formatCreationDate(course.creationDate)}
						</p>
						<div className='show-button'>
							<Button
								buttonName='Show Course'
								onClick={() => navigate(`/courses/${course.id}`)}
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
