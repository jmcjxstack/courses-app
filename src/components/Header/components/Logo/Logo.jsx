import React from 'react';

import './logo.css';
import LogoImg from '../../../../assets/Logo.png';

export default function Logo() {
	return (
		<>
			<img className='logo' src={LogoImg} alt='Courses Logo' width='80' />
		</>
	);
}
