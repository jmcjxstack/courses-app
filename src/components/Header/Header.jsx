import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './header.css';

export default function Header(props) {
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (props.isAuthenticated) {
			const userString = localStorage.getItem('isLoggedIn');
			const userObject = JSON.parse(userString);
			setUserName(userObject.user.name);
		} else {
			navigate('/login');
		}
	}, [props.isAuthenticated]);

	function logOut() {
		props.setIsAuthenticated(false);
		localStorage.removeItem('isLoggedIn');
	}

	const nameCapitalized = userName.charAt(0).toUpperCase() + userName.slice(1);

	return (
		<div className='navbar'>
			<Logo />
			{!(
				location.pathname === '/login' || location.pathname === '/registration'
			) && (
				<>
					<h5 className='name'>{nameCapitalized}</h5>
					<Button className='log-button' buttonName='Logout' onClick={logOut} />
				</>
			)}
		</div>
	);
}
