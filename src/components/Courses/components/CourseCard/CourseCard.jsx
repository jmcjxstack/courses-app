import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';

import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getCourses } from '../../../../store/courses/coursesSelectors';
import { getAuthors } from '../../../../store/authors/authorsSelectors';
import { getUserRole } from '../../../../store/user/userSelectors';
import { deleteCourseThunk } from '../../../../store/courses/coursesThunk';
import './courseCard.css';

export default function CourseCard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const role = useSelector(getUserRole);

	function handleDelete(courseId) {
		dispatch(deleteCourseThunk(courseId));
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
								{role === 'admin' && (
									<>
										<Button buttonName='🖊️' />
										<Button
											buttonName='🗑️'
											onClick={() => handleDelete(course.id)}
										/>
									</>
								)}
							</div>
						</div>
					</div>
				))}
		</>
	);
}
