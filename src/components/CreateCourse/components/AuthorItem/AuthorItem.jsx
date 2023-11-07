import React from 'react';

import Button from '../../../../common/Button/Button';

import './author-item.css';

export default function AuthorItem(props) {
	return (
		<>
			<div key={props.id} className='authors'>
				<p>{props.name}</p>
				<Button buttonName={props.buttonName} onClick={props.onClick} />
			</div>
		</>
	);
}
