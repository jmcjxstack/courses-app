import React from 'react';

import { mockedCoursesList, mockedAuthorsList } from '../../../../constants';
import Button from '../../../../common/Button/Button';

import './courseCard.css';

export default function CourseCard() {
	function showCourse() {
		console.log('showing course');
	}

	function minToHours(n) {
		let hours = n / 60;
		let rhours = Math.floor(hours);
		let minutes = (hours - rhours) * 60;
		let rminutes = Math.round(minutes);
		if (rhours < 10) {
			return `0${rhours}:${rminutes} hour(s)`;
		} else {
			return `${rhours}:${rminutes} hour(s)`;
		}
	}

	return (
		<>
			{mockedCoursesList.map((course) => (
				<div className='course-container' key={course.id}>
					<div className='course-info-left'>
						<h1>{course.title}</h1>
						<p className='description'>{course.description}</p>
					</div>
					<div className='course-info-right'>
						<p>
							<b>Authors: </b>
							{course.authors}
						</p>
						<p>
							<b>Duration: </b>
							{minToHours(course.duration)}
						</p>
						<p>
							<b>Created: </b>
							{course.creationDate.slice(0, 2)}.
							{course.creationDate.slice(3, 5)}.
							{course.creationDate.slice(6, 8)}
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
