import React from 'react';

import Button from '../../../../common/Button/Button';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

import './courseCard.css';

export default function CourseCard({ courses, authors }) {
	function showCourse() {
		console.log('showing course');
	}

	return (
		<>
			{courses.map((course) => (
				<div className='course-container' key={course.id}>
					<div className='course-info-left'>
						<h1>{course.title}</h1>
						<p className='description'>{course.description}</p>
					</div>
					<div className='course-info-right'>
						<p>
							<b>Authors: </b>
							{course.authors
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
							<Button buttonName='Show Course' onClick={showCourse} />
						</div>
					</div>
				</div>
			))}
		</>
	);
}
