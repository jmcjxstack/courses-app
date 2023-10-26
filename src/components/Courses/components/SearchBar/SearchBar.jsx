import React, { useState } from 'react';

import Input from '../../../../common/Input/Input';

export default function SearchBar() {
	const [course, setCourse] = useState({
		name: '',
	});

	const { name } = course;

	function handleInputChange(e) {
		setCourse({
			...course,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<div>
			<Input
				placeholderText='Search for a course'
				onChange={(e) => handleInputChange(e)}
				labelText='Search for a course:'
				htmlFor='searchbar'
				type={'text'}
				name='name'
				id='searchbar'
				value={name}
			/>
		</div>
	);
}
