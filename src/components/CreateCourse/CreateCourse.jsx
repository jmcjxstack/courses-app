import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';

import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getAuthors } from '../../store/authors/authorsSelectors';
import './create-course.css';

export default function CreateCourse(props) {
	const navigate = useNavigate();
	const authors = useSelector(getAuthors);
	//new state to handle info about the new course
	const [newCourse, setNewCourse] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	});
	//new state to handle the new author when you add a new author
	const [newAuthor, setNewAuthor] = useState({
		id: '',
		name: '',
	});

	//state that is a copy of the authors to be rendered
	//and manipulated to insert old authors into the next state authorsToRemove
	const [authorsToAdd, setAuthorsToAdd] = useState(props.authors);

	//state where the old authors are added to a new course
	const [authorsToRemove, setAuthorsToRemove] = useState([]);

	//this effect creates a new id and a new date and assignñs it to the newCourse state
	useEffect(() => {
		const newId = getNewId();
		const newDate = getNewDate();

		setNewCourse((prevState) => ({
			...prevState,
			id: newId,
			creationDate: newDate,
		}));
	}, []);

	//not sure if this effect is necessary but for some reason
	//adding authors does not work if this effect is missing
	//it sets the authors to add, tracking the authors, this effect should not be neccesary
	//try to remove it and see what happens
	useEffect(() => {
		setAuthorsToAdd(props.authors);
	}, [props.authors]);

	//this effect is necessary, it tracks the authors of the new course
	//and adds them to the new course
	useEffect(() => {
		const authorsList = authorsToRemove.map((author) => author.id);

		setNewCourse((prevState) => ({
			...prevState,
			authors: authorsList,
		}));
	}, [authorsToRemove]);

	//function that gets the date of creation
	function getNewDate() {
		const newDate = new Date();
		const yyyy = newDate.getFullYear();
		let mm = newDate.getMonth() + 1;
		let dd = newDate.getDate();
		const formattedDate = `${dd}/${mm}/${yyyy}`;

		return formattedDate;
	}

	//function to get the new uuid for the new course
	function getNewId() {
		const newId = uuidv4();
		return newId;
	}

	//function to manage the form input
	function handleInputChangeNewCourse(e) {
		setNewCourse({
			...newCourse,
			[e.target.name]: e.target.value,
		});
	}

	//function to manage the form input of the new author
	function handleInputChangeNewAuthorName(e) {
		setNewAuthor({
			...newAuthor,
			name: e.target.value,
		});
	}

	//handles the submit of the form of new author
	function handleSubmitNewAuthor(e) {
		e.preventDefault();

		const authorWithId = { ...newAuthor, id: getNewId() };

		props.setAuthors([...props.authors, authorWithId]);
		setNewAuthor({
			name: '',
		});
	}

	//handles click of button to add author to new course
	function handleAddAuthor(e, author) {
		e.preventDefault();
		setAuthorsToAdd(authorsToAdd.filter((a) => a.id !== author.id));
		setAuthorsToRemove([...authorsToRemove, author]);
	}

	//handles click of button to remove author from new course
	function handleRemoveAuthor(e, author) {
		e.preventDefault();
		setAuthorsToRemove(authorsToRemove.filter((a) => a.id !== author.id));
		setAuthorsToAdd([...authorsToAdd, author]);
	}

	//handles submit of new course
	function handleSubmitCourse(e) {
		e.preventDefault();
		if (
			newCourse.title === '' ||
			newCourse.description === '' ||
			newCourse.duration === 0 ||
			newCourse.authors.length === 0
		) {
			window.alert('Please fill in all fields, and add at least one author.');
		} else {
			props.setCourses([...props.courses, newCourse]);
			setNewCourse({
				id: '',
				title: '',
				description: '',
				creationDate: '',
				duration: 0,
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

CreateCourse.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			creationDate: PropTypes.string,
			duration: PropTypes.number,
			authors: PropTypes.arrayOf(PropTypes.string),
		})
	),
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	setAuthors: PropTypes.func,
	setCourses: PropTypes.func,
};
