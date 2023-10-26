import React from 'react';

import Button from '../../../../common/Button/Button';

export default function AuthorItem(props) {
	function addAuthor() {
		console.log('added author');
	}

	return (
		<>
			<p>{props.authorName}</p>
			<Button buttonName='Add Author' onClick={addAuthor} />
		</>
	);
}
