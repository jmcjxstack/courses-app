import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import './registration.css';
import { API_URL } from '../../constants';

export default function Registration() {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	function handleInputChange(e) {
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await axios.post(`${API_URL}/register`, newUser);
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className='container'>
				<h3>Registration</h3>
				<form className='registration-form' onSubmit={(e) => handleSubmit(e)}>
					<Input
						placeholderText='Enter name'
						onChange={(e) => handleInputChange(e)}
						labelText='Name:'
						htmlFor='name'
						type={'text'}
						name='name'
						value={newUser.name}
						id='name'
					/>
					<Input
						placeholderText='Enter email'
						onChange={(e) => handleInputChange(e)}
						labelText='Email:'
						htmlFor='email'
						type={'email'}
						name='email'
						value={newUser.email}
						id='email'
					/>
					<Input
						placeholderText='Enter password'
						onChange={(e) => handleInputChange(e)}
						labelText='Password:'
						htmlFor='password'
						type={'password'}
						name='password'
						value={newUser.password}
						id='password'
					/>
					<div className='registration-button'>
						<Button buttonName='Registration' />
					</div>
				</form>
				<p>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</div>
		</>
	);
}
