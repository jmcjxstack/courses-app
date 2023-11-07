import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import './login.css';
import { API_URL } from '../../constants';

export default function Login(props) {
	const navigate = useNavigate();

	useEffect(() => {
		if (props.isAuthenticated) {
			navigate('/courses');
		}
	}, [props.isAuthenticated]);

	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});

	function handleInputChange(e) {
		setLoginInfo({
			...loginInfo,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await axios.post(`${API_URL}/login`, loginInfo);
			const loginData = response.data;
			localStorage.setItem('isLoggedIn', JSON.stringify(loginData));
			props.setIsAuthenticated(true);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className='container'>
				<h3>Login</h3>
				<form className='login-form' onSubmit={(e) => handleSubmit(e)}>
					<Input
						placeholderText='Enter email'
						onChange={(e) => handleInputChange(e)}
						labelText='Email:'
						htmlFor='email'
						type={'email'}
						name='email'
						value={loginInfo.email}
						id='email'
					/>
					<Input
						placeholderText='Enter password'
						onChange={(e) => handleInputChange(e)}
						labelText='Password:'
						htmlFor='password'
						type={'password'}
						name='password'
						value={loginInfo.password}
						id='password'
					/>
					<div className='login-button'>
						<Button buttonName='Login' />
					</div>
				</form>
				<p>
					If you don't have an account you can go to{' '}
					<Link to='/registration'>Registration</Link>{' '}
				</p>
			</div>
		</>
	);
}
