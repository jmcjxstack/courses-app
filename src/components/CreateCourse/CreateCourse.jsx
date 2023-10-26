import React, { useState } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { mockedAuthorsList } from '../../constants';

import './create-course.css';

export default function CreateCourse() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [newCourseAuthors, setNewCourseAuthors] = useState([]);

	function onChange() {
		console.log('ad');
	}

	function createCourse() {
		console.log('course created');
	}

	function createAuthor() {
		console.log('author created');
	}

	return (
		<>
			<div className='top'>
				<Input
					placeholderText='Enter title'
					onChange={onChange}
					labelText='Title:'
					htmlFor='title'
					type='text'
					id='title'
				/>
				<div className='create-course-button'>
					<Button buttonName='Create Course' onClick={createCourse} />
				</div>
			</div>
			<div className='textarea'>
				<label htmlFor='description'>Description:</label>
				<textarea
					name='description'
					id='description'
					cols={10}
					rows={10}
					placeholder='Enter description'
					required
				/>
			</div>
			<div className='bottom'>
				<div className='info'>
					<div className='author-info'>
						<p>
							<b>Author info</b>
						</p>
						<Input
							placeholderText='Enter autho name'
							onChange={onChange}
							labelText='Author name:'
							htmlFor='author-name'
							type='text'
							id='author-name'
						/>
						<Button buttonName='Create Author' onClick={createAuthor} />
					</div>
					<div className='author-info'>
						<p>
							<b>Duration</b>
						</p>
						<Input
							placeholderText='Enter duration in minutes'
							onChange={onChange}
							labelText='Duration:'
							htmlFor='duration'
							type='text'
							id='duration'
						/>
						<h3>Duration: {getCourseDuration()}</h3>
					</div>
				</div>
				<div className='add-author'>
					<p>
						<b>Authors</b>
					</p>
					<AuthorItem authors={authors} buttonName='Add Author' />
					<p>
						<b>Course Authors</b>
						{newCourseAuthors.length === 0 ? (
							<p>Authors list is empty</p>
						) : (
							<AuthorItem
								authors={newCourseAuthors}
								buttonName='Delete Author'
							/>
						)}
					</p>
				</div>
			</div>
		</>
	);
}
