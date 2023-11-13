import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../common/Button/Button';

import { getCourseDuration } from '../../helpers/getCourseDuration';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getCourseById } from '../../store/courses/coursesSelectors';
import { getAuthors } from '../../store/authors/authorsSelectors';
import './course-info.css';

export default function CourseInfo() {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const authors = useSelector(getAuthors);
	const courseInfo = useSelector((state) => getCourseById(state, courseId));

	const authorsList = courseInfo?.authors.map(
		(authorId) => authors?.find((author) => author.id === authorId).name
	);

	return (
		<div className='course-info-container'>
			<div className='course-info'>
				<div className='back-to-courses'>
					<Button
						buttonName='< Back to courses'
						onClick={() => navigate('/courses')}
					/>
				</div>
				<div className='course-title'>
					<h1>{courseInfo && courseInfo?.title}</h1>
				</div>

				<div className='info-container'>
					<div className='course-description'>
						<p>{courseInfo && courseInfo?.description}</p>
					</div>
					<div className='course-details'>
						<p>
							<b>ID: </b>
							{courseInfo && courseInfo?.id}
						</p>
						<p>
							<b>Duration: </b>
							{courseInfo &&
								courseInfo.duration &&
								getCourseDuration(courseInfo?.duration)}
						</p>
						<p>
							<b>Created: </b>
							{courseInfo &&
								courseInfo.creationDate &&
								formatCreationDate(courseInfo?.creationDate)}
						</p>

						<b>Authors: </b>
						<div className='course-authors'>
							{courseInfo &&
								authors &&
								authorsList?.map((author, idx) => <p key={idx}>{author}</p>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
