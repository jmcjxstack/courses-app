import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../../common/Button/Button';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

import './courseCard.css';

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
