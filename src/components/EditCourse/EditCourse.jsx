import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';

import {
	addAuthorService,
	loadCourseService,
	updateCourseService,
} from '../../services';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthors } from '../../store/authors/authorsSelectors';
import { updateCourse } from '../../store/courses/coursesSlice';
import { addAuthor } from '../../store/authors/authorsSlice';
import './edit-course.css';

export default function EditCourse() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const authors = useSelector(getAuthors);

	const [newCourse, setNewCourse] = useState({
		title: '',
		description: '',
		duration: 0,
		authors: [],
	});

	const [newAuthor, setNewAuthor] = useState({
		name: '',
	});

	const [authorsToAdd, setAuthorsToAdd] = useState(authors);

	const [authorsToRemove, setAuthorsToRemove] = useState([]);

	useEffect(() => {
		async function loadCourse() {
			const response = await loadCourseService(courseId);
			setNewCourse(response);
		}
		loadCourse();
	}, [courseId]);

	useEffect(() => {
		setAuthorsToAdd(authors);
	}, [authors]);

	useEffect(() => {
		const authorsList = authorsToRemove.map((author) => author.id);
		setNewCourse((prevState) => ({
			...prevState,
			authors: authorsList,
		}));
	}, [authorsToRemove]);

	function handleInputChangeNewCourse(e) {
		const updatedValue =
			e.target.name === 'duration'
				? parseInt(e.target.value, 10)
				: e.target.value;
		setNewCourse({
			...newCourse,
			[e.target.name]: updatedValue,
		});
	}

	function handleInputChangeNewAuthorName(e) {
		setNewAuthor({
			...newAuthor,
			name: e.target.value,
		});
	}

	async function handleSubmitNewAuthor(e) {
		e.preventDefault();
		const response = await addAuthorService(newAuthor);
		dispatch(addAuthor(response.result));
		setNewAuthor({
			name: '',
		});
	}

	function handleAddAuthor(e, author) {
		e.preventDefault();
		setAuthorsToAdd(authorsToAdd.filter((a) => a.id !== author.id));
		setAuthorsToRemove([...authorsToRemove, author]);
	}

	function handleRemoveAuthor(e, author) {
		e.preventDefault();
		setAuthorsToRemove(authorsToRemove.filter((a) => a.id !== author.id));
		setAuthorsToAdd([...authorsToAdd, author]);
	}

	async function handleSubmitCourse(e) {
		e.preventDefault();
		if (
			newCourse.title === '' ||
			newCourse.description === '' ||
			newCourse.duration === 0 ||
			newCourse.authors.length === 0
		) {
			window.alert('Please fill in all fields, and add at least one author.');
		} else {
			const response = await updateCourseService(courseId, newCourse);
			const updatedCourseData = response.result;
			dispatch(updateCourse({ courseId, updatedCourseData }));
			navigate('/courses');
		}
	}

	return (
		<>
			<form>
				<div className='top'>
					<div className='title-input'>
						<Input
							placeholderText='Enter title'
							onChange={(e) => handleInputChangeNewCourse(e)}
							labelText='Title'
							htmlFor='title'
							type='text'
							name='title'
							value={newCourse.title}
							id='title'
							required={true}
						/>
					</div>
					<div className='create-course-button'>
						<Button
							buttonName='Update Course'
							onClick={(e) => handleSubmitCourse(e)}
						/>
					</div>
				</div>
				<div className='textarea'>
					<label htmlFor='description'>Description</label>
					<textarea
						placeholder='Enter description'
						onChange={(e) => handleInputChangeNewCourse(e)}
						cols={50}
						rows={10}
						name='description'
						value={newCourse.description}
						id='description'
						required
					/>
				</div>
				<div className='bottom'>
					<div className='info'>
						<div className='author-info'>
							<p>Add author</p>
							<Input
								placeholderText='Enter author name'
								onChange={(e) => handleInputChangeNewAuthorName(e)}
								labelText='Author name'
								htmlFor='author-name'
								type='text'
								name='name'
								value={newAuthor.name}
								id='author-name'
								required={false}
							/>
							<Button
								buttonName='Create Author'
								onClick={(e) => handleSubmitNewAuthor(e)}
							/>
						</div>
						<div className='author-info'>
							<p>Duration</p>
							<Input
								placeholderText='Enter duration in minutes'
								onChange={(e) => handleInputChangeNewCourse(e)}
								labelText='Duration'
								htmlFor='duration'
								type='text'
								name='duration'
								value={newCourse.duration || ''}
								id='duration'
								required={true}
							/>
							<p className='duration'>
								Duration: {getCourseDuration(newCourse.duration)}
							</p>
						</div>
					</div>
					<div className='add-remove-author'>
						<p>Authors</p>
						<div className='author-list'>
							{authorsToAdd.length === 0 ? (
								<p className='empty-list'>Author list is empty</p>
							) : (
								authorsToAdd.map((author) => (
									<AuthorItem
										key={author.id}
										id={author.id}
										name={author.name}
										buttonName='Add author'
										onClick={(e) => handleAddAuthor(e, author)}
									/>
								))
							)}
						</div>
						<p>Course Authors</p>
						<div className='author-list'>
							{authorsToRemove.length === 0 ? (
								<p className='empty-list'>Author list is empty</p>
							) : (
								authorsToRemove.map((author) => (
									<AuthorItem
										key={author.id}
										id={author.id}
										name={author.name}
										buttonName='Delete author'
										onClick={(e) => handleRemoveAuthor(e, author)}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
