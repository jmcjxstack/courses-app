import React from 'react';

import Button from '../../../../common/Button/Button';

import './author-item.css';

export default function AuthorItem({ authors, buttonName }) {
	function addAuthor() {
		console.log('added author');
	}

	return (
		<>
			{authors.map((author, idx) => (
				<div key={idx} className='authors'>
					<p>{author.name}</p>
					<Button buttonName='Add Author' onClick={addAuthor} />
				</div>
			))}
		</>
	);
}
