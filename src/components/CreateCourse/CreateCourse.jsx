import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { getCourseDuration } from '../../helpers/getCourseDuration';

import './create-course.css';

export default function CreateCourse(props) {
	const [createdAuthor, setCreatedAuthor] = useState([]);

	useEffect(() => {
		const newId = getNewId();
		const newDate = getNewDate();

		props.setNewCourse({
			...props.newCourse,
			id: newId,
			creationDate: newDate,
		});
	}, []);

	function getNewDate() {
		const newDate = new Date();
		const yyyy = newDate.getFullYear();
		let mm = newDate.getMonth() + 1;
		let dd = newDate.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		const formattedDate = `${dd}/${mm}/${yyyy}`;
		return formattedDate;
	}

	function getNewId() {
		const newId = uuidv4();
		return newId;
	}

	function handleInputChangeNewCourse(e) {
		props.setNewCourse({
			...props.newCourse,
			[e.target.name]: e.target.value,
		});
	}

	function handleInputChangeNewAuthorName(e) {
		props.setNewAuthor({
			...props.newAuthor,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmitCourse(e) {
		e.preventDefault();
		props.setCourses([...props.courses, props.newCourse]);
		props.setNewCourse({
			id: '',
			title: '',
			description: '',
			creationDate: '',
			duration: undefined,
			authors: [],
		});
		props.toggleCreateCourse();
	}

	return (
		<>
			<form>
				<div className='top'>
					<Input
						placeholderText='Enter title'
						onChange={(e) => handleInputChangeNewCourse(e)}
						labelText='Title:'
						htmlFor='title'
						type={'text'}
						name='title'
						value={props.newCourse.title}
						id='title'
					/>
					<div className='create-course-button'>
						<Button
							buttonName='Create Course'
							onClick={(e) => handleSubmitCourse(e)}
						/>
					</div>
				</div>
				<div className='textarea'>
					<label htmlFor='description'>Description:</label>
					<textarea
						placeholder='Enter description'
						onChange={(e) => handleInputChangeNewCourse(e)}
						cols={50}
						rows={10}
						name='description'
						value={props.newCourse.description}
						id='description'
					/>
				</div>
				<div className='bottom'>
					<div className='info'>
						<div className='author-info'>
							<p>
								<b>Author info</b>
							</p>
							<Input
								placeholderText='Enter author name'
								onChange={(e) => handleInputChangeNewAuthorName(e)}
								labelText='Author name:'
								htmlFor='author-name'
								type={'text'}
								name='name'
								value={props.newAuthor.name}
								id='author-name'
							/>
							<Button buttonName='Create Author' />
						</div>
						<div className='author-info'>
							<p>
								<b>Duration</b>
							</p>
							<Input
								placeholderText='Enter duration in minutes'
								onChange={(e) => handleInputChangeNewCourse(e)}
								labelText='Duration:'
								htmlFor='duration'
								type={'text'}
								name='duration'
								value={props.newCourse.duration || ''}
								id='duration'
							/>
							<h3>Duration: {getCourseDuration(props.newCourse.duration)}</h3>
						</div>
					</div>
					<div className='add-author'>
						<p>
							<b>Authors</b>
						</p>
						<AuthorItem authors={props.authors} buttonName='Add Author' />
						<div className='course-authors'>
							<p>
								<b>Course Authors</b>
							</p>
							{createdAuthor.length === 0 ? (
								<p>Authors list is empty</p>
							) : (
								<AuthorItem
									authors={props.authors}
									buttonName='Delete Author'
								/>
							)}
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
