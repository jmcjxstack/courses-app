import React from 'react';

import Button from '../../../../common/Button/Button';

import './author-item.css';

export default function AuthorItem(props) {
	function addAuthor() {
		console.log('added author');
	}

	return (
		<>
			{props.authors.map((author, idx) => (
				<div key={idx} className='authors'>
					<p>{author.name}</p>
					<Button buttonName={props.buttonName} onClick={addAuthor} />
				</div>
			))}
		</>
	);
}
