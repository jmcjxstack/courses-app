import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import './login.css';

export default function Registration() {
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

	function handleSubmit(e) {
		console.log(e);
	}

	return (
		<>
			<Header loginOrRegistration={true} />
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
