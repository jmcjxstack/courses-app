import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';

export default function CourseInfo() {
	const [courseInfo, setCourseInfo] = useState();
	const navigate = useNavigate();

	const { courseId } = useParams();

	useEffect(() => {
		loadCourse();
	}, []);

	async function loadCourse() {
		try {
			const response = await axios.get(
				`http://localhost:4000/courses/${courseId}`
			);
			console.log(response.data.result);
			setCourseInfo(response.data.result);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<Button
				buttonName='Back to Courses'
				onClick={() => navigate('/courses')}
			/>
			<h1>{courseInfo.title}</h1>
			<p>{courseInfo.description}</p>
			<p>{courseInfo.creationDate}</p>
			<p>Course ID: {courseInfo.id}</p>
			{courseInfo.authors.map((author, idx) => (
				<p key={idx}>Author ID: {author}</p>
			))}
		</div>
	);
}
