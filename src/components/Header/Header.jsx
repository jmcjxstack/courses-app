import React from 'react';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './header.css';

export default function Header(props) {
	function logOut() {
		console.log('button clicked');
	}

	return (
		<div className='navbar'>
			<Logo />
			{props.loginOrRegistration === false && (
				<>
					<h5 className='name'>Jose</h5>
					<Button className='log-button' buttonName='Logout' onClick={logOut} />
				</>
			)}
		</div>
	);
}
