import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import { resetUser } from '../../store/user/userSlice';
import { getUserName } from '../../store/user/userSelectors';
import './header.css';

export default function Header() {
	const location = useLocation();
	const dispatch = useDispatch();
	const userName = useSelector(getUserName);

	function logOut() {
		dispatch(resetUser());
		localStorage.removeItem('isAuth');
	}

	const nameCapitalized = userName.charAt(0).toUpperCase() + userName.slice(1);

	return (
		<div className='navbar'>
			<div className='logo'>
				<Link to={'/courses'}>
					<Logo />
				</Link>
			</div>
			{!(
				location.pathname === '/login' || location.pathname === '/registration'
			) && (
				<>
					<h5 className='name'>{nameCapitalized}</h5>
					<Button
						className='log-out-button'
						buttonName='Logout'
						onClick={logOut}
					/>
				</>
			)}
		</div>
	);
}
