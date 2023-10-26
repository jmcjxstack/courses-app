import React from 'react';

import Input from '../../../../common/Input/Input';

function onChange() {
	console.log('change');
}

export default function SearchBar() {
	return (
		<div>
			<Input
				placeholder='Search for a course'
				onChange={onChange}
				labelText='Search for a course: '
				htmlFor='input'
				type='text'
			/>
		</div>
	);
}
