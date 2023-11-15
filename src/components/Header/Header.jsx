import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import { fetchUserData, logoutUser } from '../../store/user/userSlice';
import { getUserName } from '../../store/user/userSelectors';
import './header.css';

export default function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userName = useSelector(getUserName);

	useEffect(() => {
		if (
			!(location.pathname === '/login' || location.pathname === '/registration')
		) {
			dispatch(fetchUserData());
		}
	}, [location, dispatch]);

	function logOut() {
		dispatch(logoutUser());
		navigate('/login');
	}

	const nameCapitalized =
		userName?.charAt(0).toUpperCase() + userName?.slice(1);

	return (
		<div className='navbar-container'>
			<div className='navbar'>
				<div className='logo'>
					<Link to={'/courses'}>
						<Logo />
					</Link>
				</div>
				{!(
					location.pathname === '/login' ||
					location.pathname === '/registration'
				) && (
					<div className='name-and-button'>
						<p className='name'>{userName && nameCapitalized}</p>
						<Button
							className='log-out-button'
							buttonName='Logout'
							onClick={logOut}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
