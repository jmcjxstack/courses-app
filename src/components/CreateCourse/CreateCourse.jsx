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
		const newId = uuidv4();
		const newDate = new Date();
		const formattedDate = `${newDate.getDate()}/${
			newDate.getMonth() + 1
		}/${newDate.getFullYear()}`;

		props.setNewCourse({
			...props.newCourse,
			id: newId,
			creationDate: formattedDate,
		});
	}, []);

	return (
		<>
			<form>
				<div className='top'>
					<Input
						placeholderText='Enter title'
						onChange={props.handleInputChange}
						labelText='Title:'
						htmlFor='title'
						type={'text'}
						name='title'
						value={props.title}
						id='title'
					/>
					<div className='create-course-button'>
						<Button
							buttonName='Create Course'
							onClick={props.handleSubmitCourse}
						/>
					</div>
				</div>
				<div className='textarea'>
					<label htmlFor='description'>Description:</label>
					<textarea
						onChange={props.handleInputChange}
						name='description'
						id='description'
						cols={10}
						rows={10}
						value={props.description}
						placeholder='Enter description'
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
								onChange={props.handleNewAuthorChange}
								labelText='Author name:'
								htmlFor='author-name'
								type='text'
								id='author-name'
								name='newAuthorName'
								value={props.newAuthor.id}
							/>
							<Button buttonName='Create Author' />
						</div>
						<div className='author-info'>
							<p>
								<b>Duration</b>
							</p>
							<Input
								placeholderText='Enter duration in minutes'
								onChange={props.handleInputChange}
								labelText='Duration:'
								htmlFor='duration'
								name='duration'
								value={props.duration}
								type='text'
								id='duration'
							/>
							<h3>Duration: {getCourseDuration(props.duration)}</h3>
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
