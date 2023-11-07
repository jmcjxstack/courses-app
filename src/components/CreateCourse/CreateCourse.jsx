import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';

import { getCourseDuration } from '../../helpers/getCourseDuration';
import './create-course.css';

export default function CreateCourse(props) {
	const navigate = useNavigate();
	const [newCourse, setNewCourse] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: undefined,
		authors: [],
	});

	const [newAuthor, setNewAuthor] = useState({
		id: '',
		name: '',
	});

	const [authorsToAdd, setAuthorsToAdd] = useState(props.authors);

	const [authorsToRemove, setAuthorsToRemove] = useState([]);

	useEffect(() => {
		const newId = getNewId();
		const newDate = getNewDate();

		setNewCourse((prevState) => ({
			...prevState,
			id: newId,
			creationDate: newDate,
		}));
	}, []);

	useEffect(() => {
		setAuthorsToAdd(props.authors);
	}, [props.authors]);

	useEffect(() => {
		const authorsList = authorsToRemove.map((author) => author.id);

		setNewCourse((prevState) => ({
			...prevState,
			authors: authorsList,
		}));
	}, [authorsToRemove]);

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
		setNewCourse({
			...newCourse,
			[e.target.name]: e.target.value,
		});
	}

	function handleInputChangeNewAuthorName(e) {
		setNewAuthor({
			...newAuthor,
			name: e.target.value,
		});
	}

	function handleSubmitNewAuthor(e) {
		e.preventDefault();

		const authorWithId = { ...newAuthor, id: getNewId() };

		props.setAuthors([...props.authors, authorWithId]);
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

	function handleSubmitCourse(e) {
		e.preventDefault();
		if (
			newCourse.title === '' ||
			newCourse.description === '' ||
			newCourse.duration === undefined
		) {
			window.alert('Please fill in all fields');
		} else {
			props.setCourses([...props.courses, newCourse]);

			setNewCourse({
				id: '',
				title: '',
				description: '',
				creationDate: '',
				duration: undefined,
				authors: [],
			});
			navigate('/courses');
		}
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
						value={newCourse.title}
						id='title'
						required={true}
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
						value={newCourse.description}
						id='description'
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
								placeholderText='Enter author name'
								onChange={(e) => handleInputChangeNewAuthorName(e)}
								labelText='Author name:'
								htmlFor='author-name'
								type={'text'}
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
								value={newCourse.duration || ''}
								id='duration'
								required={true}
							/>
							<h3>Duration: {getCourseDuration(newCourse.duration)}</h3>
						</div>
					</div>
					<div className='add-remove-author'>
						<p>
							<b>Authors</b>
						</p>
						{authorsToAdd.map((author) => (
							<AuthorItem
								key={author.id}
								id={author.id}
								name={author.name}
								buttonName='Add author'
								onClick={(e) => handleAddAuthor(e, author)}
							/>
						))}
						<p>
							<b>Course Authors</b>
						</p>
						{authorsToRemove.length === 0 ? (
							<p>Author list is empty</p>
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
			</form>
		</>
	);
}
