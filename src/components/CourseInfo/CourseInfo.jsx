import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Button from '../../common/Button/Button';

import './course-info.css';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { formatCreationDate } from '../../helpers/formatCreationDate';

export default function CourseInfo({ courses, authors }) {
	const navigate = useNavigate();
	const { courseId } = useParams();
	const [courseInfo, setCourseInfo] = useState();

	useEffect(() => {
		getCourseById(courseId);
	}, []);

	function getCourseById(id) {
		const course = courses.find((item) => item.id === id);
		setCourseInfo(course);
	}

	const authorsList = courseInfo?.authors.map(
		(authorId) => authors?.find((author) => author.id === authorId).name
	);

	return (
		<>
			<Header loginOrRegistration={false} />
			<div className='back-to-courses'>
				<Button
					buttonName='< Back to courses'
					onClick={() => navigate('/courses')}
				/>
			</div>
			<div className='course-title'>
				<h1>{courseInfo?.title}</h1>
			</div>

			<div className='info-container'>
				<div className='course-description'>
					<p>{courseInfo?.description}</p>
				</div>
				<div className='course-details'>
					<p>
						<b>ID: </b>
						{courseInfo?.id}
					</p>
					<p>
						<b>Duration: </b>
						{getCourseDuration(courseInfo?.duration)}
					</p>
					<p>
						<b>Created: </b>
						{courseInfo?.creationDate}
						{/* {formatCreationDate(courseInfo?.creationDate)} */}
					</p>

					<b>Authors: </b>
					<div className='course-authors'>
						{authorsList?.map((author, idx) => (
							<p key={idx}>{author}</p>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
