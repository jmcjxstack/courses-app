import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Button from '../../common/Button/Button';
import { API_URL } from '../../constants';

export default function CourseInfo() {
	const [courseInfo, setCourseInfo] = useState();
	const navigate = useNavigate();
	const { courseId } = useParams();

	useEffect(() => {
		loadCourse();
	}, []);

	async function loadCourse() {
		try {
			const response = await axios.get(`${API_URL}/courses/${courseId}`);
			setCourseInfo(response.data.result);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Header />
			<Button
				buttonName='Back to Courses'
				onClick={() => navigate('/courses')}
			/>
			<h1>{courseInfo?.title}</h1>
			<p>{courseInfo?.description}</p>
			<p>{courseInfo?.creationDate}</p>
			<p>Course ID: {courseInfo?.id}</p>
			{courseInfo?.authors.map((author, idx) => (
				<p key={idx}>Author ID: {author}</p>
			))}
		</>
	);
}
