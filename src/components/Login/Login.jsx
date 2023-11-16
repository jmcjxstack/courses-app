import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { loginUserService } from '../../services';
import { updateUser } from '../../store/user/userSlice';
import './login.css';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuthenticated = !!localStorage.getItem('isAuth');

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/courses');
		}
	}, [isAuthenticated, navigate]);

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
			const loginData = await loginUserService(loginInfo);
			dispatch(updateUser(loginData));
			navigate('/courses');
		} catch (error) {
			alert(error);
		}
	}

	return (
		<div className='login-container'>
			<div className='login'>
				<p className='login-title'>Login</p>
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
		</div>
	);
}
