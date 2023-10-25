import React from 'react';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './header.css';

export default function Header() {
	function handleButtonClick() {
		console.log('button clicked');
	}

	return (
		<div className='navbar'>
			<Logo />
			<h5 className='name'>Jose</h5>
			<Button
				className='log-button'
				buttonName='Logout'
				onClick={handleButtonClick}
			/>
		</div>
	);
}
